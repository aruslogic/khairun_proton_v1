"""Package deployable source without Git, dependencies or research downloads."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parent.parent
output = root.parent / 'ProtonMatch-Khairun-premium.zip'
excluded = {'.git', 'node_modules', 'research', 'test-output', '_site', '__pycache__'}
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for file in sorted(root.rglob('*')):
        relative = file.relative_to(root)
        if file.is_file() and not excluded.intersection(relative.parts) and file.suffix != '.zip':
            archive.write(file, relative.as_posix())
with ZipFile(output) as archive:
    assert archive.testzip() is None
    for required in ['index.html', 'showroom.js', 'showroom-data.js', 'manifest.json', 'sw.js', '.github/workflows/pages.yml', 'data/s70.json']:
        assert required in archive.namelist()
print(f'Created {output.name} ({output.stat().st_size:,} bytes)')
