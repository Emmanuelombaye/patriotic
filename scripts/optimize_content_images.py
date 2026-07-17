"""Generate responsive WebP and AVIF variants for large editorial images."""

from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "public" / "images"
WIDTHS = (320, 640, 960, 1536)
SOURCES = {
    "health-standard-collage.webp": "health-standard-collage",
    "efexia-peptide-hero.webp": "efexia-peptide-hero",
    "efexia-peptide-science.webp": "efexia-peptide-science",
    "efexia-peptide-recovery.webp": "efexia-peptide-recovery",
}


def output_path(stem: str, width: int, intrinsic_width: int, suffix: str) -> Path:
    width_suffix = "" if width == intrinsic_width else f"-{width}"
    return IMAGE_DIR / f"{stem}{width_suffix}.{suffix}"


def main() -> None:
    for source_name, output_stem in SOURCES.items():
        source_path = IMAGE_DIR / source_name
        with Image.open(source_path) as source:
            image = ImageOps.exif_transpose(source).convert("RGB")
            intrinsic_width = image.width

            for width in (width for width in WIDTHS if width <= intrinsic_width):
                height = round(image.height * width / intrinsic_width)
                resized = image if width == intrinsic_width else image.resize(
                    (width, height),
                    Image.Resampling.LANCZOS,
                )
                resized.save(
                    output_path(output_stem, width, intrinsic_width, "webp"),
                    "WEBP",
                    quality=76,
                    method=6,
                )
                resized.save(
                    output_path(output_stem, width, intrinsic_width, "avif"),
                    "AVIF",
                    quality=50,
                    speed=6,
                )

        print(f"Optimized {source_name}")


if __name__ == "__main__":
    main()
