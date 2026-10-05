"""Generate a placeholder CV PDF for Mahmudul Hasan's portfolio.

This is a minimal placeholder. Replace /public/Mahmudul-Hasan-CV.pdf with the
real CV — the UI will pick it up automatically via siteConfig.cvPath.
"""

from pathlib import Path

OUTPUT = Path("/home/z/my-project/public/Mahmudul-Hasan-CV.pdf")

# Minimal valid PDF — single page, no external deps.
# This is intentionally a placeholder; the user should replace it with their
# actual CV. We embed plain text so the file is real and downloadable.
TEXT = """Mahmudul Hasan
Computer Science & Engineering Student - Software Developer - AI Enthusiast - Builder

United International University (UIU) - B.Sc. in Computer Science & Engineering
Dhaka, Bangladesh - Expected graduation: 2027

GitHub: https://github.com/mahmudul286
LinkedIn: https://www.linkedin.com/in/mahmudul-hasan-20ed/

This is a placeholder CV.
Replace /public/Mahmudul-Hasan-CV.pdf with the real CV file.
The portfolio UI references this file via siteConfig.cvPath and triggers a
direct download using the `download` attribute on the CV button.
"""

# Escape parentheses for PDF strings
def pdf_escape(s: str) -> str:
    return s.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")

lines = TEXT.split("\n")
content_lines = []
y = 760
for line in lines:
    if line.strip():
        escaped = pdf_escape(line)
        content_lines.append(f"BT /F1 11 Tf 72 {y} Td ({escaped}) Tj ET")
    y -= 16

content_stream = "\n".join(content_lines)

# Build PDF with proper xref offsets
parts = []

header = b"%PDF-1.4\n"
parts.append(header)

obj1 = b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
parts.append(obj1)

obj2 = b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"
parts.append(obj2)

obj3 = b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>\nendobj\n"
parts.append(obj3)

content_bytes = content_stream.encode("latin-1")
obj4 = b"4 0 obj\n<< /Length " + str(len(content_bytes)).encode() + b" >>\nstream\n" + content_bytes + b"\nendstream\nendobj\n"
parts.append(obj4)

obj5 = b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"
parts.append(obj5)

# Compute offsets
offsets = [0]
pos = 0
for p in parts:
    pos += len(p)
    offsets.append(pos)

xref_start = pos
xref = b"xref\n0 6\n"
for i in range(6):
    if i == 0:
        xref += b"0000000000 65535 f \n"
    else:
        xref += f"{offsets[i]:010d} 00000 n \n".encode()

trailer = b"trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + str(xref_start).encode() + b"\n%%EOF\n"

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
with OUTPUT.open("wb") as f:
    for p in parts:
        f.write(p)
    f.write(xref)
    f.write(trailer)

print(f"Wrote placeholder CV: {OUTPUT} ({OUTPUT.stat().st_size} bytes)")
