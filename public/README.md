Place your resume PDF in this folder as `resume.pdf`.

How to add the file (examples):

# 1) Drag & drop in VS Code
Open the project in VS Code, then drag your PDF into this `public/` folder.

# 2) From the terminal (macOS zsh)
# from project root
mkdir -p public
cp ~/Downloads/Your_Resume.pdf public/resume.pdf

# 3) If you prefer another filename
If you name the file something else (e.g. `Nirvisha_Sriram_Resume.pdf`), update the links in `components/Hero.tsx` and `components/Contact.tsx` to point to the exact filename, or tell me and I can update them.

After adding the file, run:

npm run dev

Then visit http://localhost:3000/resume.pdf to verify it serves as a PDF.