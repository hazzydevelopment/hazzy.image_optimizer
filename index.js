const core = require("@actions/core");
const sharp = require("sharp");
const glob = require("glob");
const fs = require("fs");

async function run() {
  try {
    const folder = core.getInput("path");
    const outWebp = core.getInput("output_webp") === "true";
    const outAvif = core.getInput("output_avif") === "true";
    const resizeW = core.getInput("resize_width");
    const resizeH = core.getInput("resize_height");
    const removeExif = core.getInput("remove_exif") === "true";

    const files = glob.sync(`${folder}/**/*.{png,jpg,jpeg,webp}`);

    let count = 0;
    core.info(`Found ${files.length} images.`);

    await Promise.all(
      files.map(async (file) => {
        let pipeline = sharp(file);

        // Resize
        if (resizeW || resizeH) {
          pipeline = pipeline.resize({
            width: resizeW ? parseInt(resizeW) : null,
            height: resizeH ? parseInt(resizeH) : null,
            fit: "inside"
          });
        }

        // Strip EXIF
        if (removeExif) {
          pipeline = pipeline.withMetadata({ exif: false });
        }

        const buf = await pipeline.toBuffer();
        fs.writeFileSync(file, buf);

        // Extra formats
        if (outWebp) {
          await sharp(buf).webp({ quality: 80 }).toFile(file + ".webp");
        }

        if (outAvif) {
          await sharp(buf).avif({ quality: 60 }).toFile(file + ".avif");
        }

        count++;
      })
    );

    core.info(`Optimized ${count} images.`);
    core.setOutput("optimized_count", count);
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
