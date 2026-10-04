"""Extract photographic panels from locally rendered official brochures."""
from pathlib import Path
import pypdfium2 as pdfium
boxes = {
    'saga': [(0.012,.43,.238,.746),(.163,.217,.238,.39)],
    's70': [(0,.355,.25,.744),(.193,.251,.235,.326)],
    'x50': [(.209,.45,.391,.751),(.330,.22,.389,.395)],
    'x70': [(.512,.646,.733,.982),(.02,.254,.24,.745)],
    'x90': [(0,.394,.25,.744),(.168,.211,.238,.343)],
}
out=Path('assets/gallery')
out.mkdir(exist_ok=True)
for name,regions in boxes.items():
    im=pdfium.PdfDocument(f'research/{name}.pdf')[0].render(scale=4).to_pil()
    for kind,box in zip(['exterior','interior'],regions):
        crop=im.crop(tuple(round(n*(im.width if i%2==0 else im.height)) for i,n in enumerate(box)))
        crop.thumbnail((1100,900))
        crop.save(out/f'{name}-{kind}.webp',quality=85)
