"""Generate favicon assets from the Efexia logo (newlogo.webp)."""
from __future__ import annotations

import base64
import io
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
LOGO_PATH = PUBLIC / "newlogo.webp"


def crop_icon(logo: Image.Image) -> Image.Image:
    """Crop to the icon mark only (exclude EFEXIA wordmark)."""
    width, height = logo.size
    # Icon content ends ~y=300; wordmark begins ~y=352.
    icon_bottom = 302
    icon_top = 18
    icon_height = icon_bottom - icon_top
    left = (width - icon_height) // 2
    right = left + icon_height
    return logo.crop((left, icon_top, right, icon_bottom))


def make_square(icon: Image.Image, size: int, padding: float = 0.08) -> Image.Image:
    """Resize icon into a square canvas with slight padding."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 255))
    pad = int(size * padding)
    inner = size - pad * 2
    resized = icon.resize((inner, inner), Image.Resampling.LANCZOS)
    canvas.paste(resized, (pad, pad), resized)
    return canvas


def write_ico(square: Image.Image, path: Path) -> None:
    sizes = [16, 32, 48]
    images = [make_square(square, s, padding=0.06) for s in sizes]
    images[0].save(
        path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=images[1:],
    )


def write_png(square: Image.Image, path: Path, size: int) -> None:
    make_square(square, size, padding=0.06).save(path, format="PNG", optimize=True)


def write_svg(square: Image.Image, path: Path) -> None:
    """SVG favicon with embedded PNG for crisp scaling."""
    png = make_square(square, 512, padding=0.06)
    buf = io.BytesIO()
    png.save(buf, format="PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    path.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">'
        f'<image href="data:image/png;base64,{b64}" width="512" height="512"/>'
        f"</svg>",
        encoding="utf-8",
    )


def main() -> None:
    logo = Image.open(LOGO_PATH).convert("RGBA")
    icon = crop_icon(logo)

    write_svg(icon, PUBLIC / "favicon.svg")
    write_ico(icon, PUBLIC / "favicon.ico")
    write_png(icon, PUBLIC / "favicon-16x16.png", 16)
    write_png(icon, PUBLIC / "favicon-32x32.png", 32)
    write_png(icon, PUBLIC / "apple-touch-icon.png", 180)

    print("Generated favicon assets in public/:")
    for name in (
        "favicon.svg",
        "favicon.ico",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "apple-touch-icon.png",
    ):
        p = PUBLIC / name
        print(f"  {name}: {p.stat().st_size} bytes")


if __name__ == "__main__":
    main()
