# Engineering-Economy-Project

**ENGR 3222 — Engineering Economy · Spring 2026 · The American University in Cairo**

Term project: **Economic Analysis of Autonomous Site Monitoring Systems for Large-Scale Construction Projects**.

## Team

| Name        | ID         | Department              |
|-------------|-----------:|-------------------------|
| Ziad Hassan | 900213728  | Computer Engineering    |
| Ahmed Anton | 900253324  | Construction Engineering|

## What's in this repo

| Folder | Contents |
|---|---|
| `proposal/` | Original course handout + our project proposal (`.docx`, `.pdf`). |
| `financial-model/` | Python program that generates the full Excel financial model. Open `output/Engineering_Economy_Analysis.xlsx`. |
| `slides/` | React presentation deck (Vite + React + Framer Motion). The 7-min final-class presentation. |

## Quick start

### Open the Excel financial model

```
financial-model/output/Engineering_Economy_Analysis.xlsx
```

Re-generate after editing assumptions:

```bash
cd financial-model
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python build_excel.py
```

### Run the slide deck

```bash
cd slides
npm install
npm run dev
```

Then open the printed URL (typically `http://localhost:5173`). Navigate with **← →** arrow keys, jump with **1–9**, fullscreen with **F**.

## Method summary

- Currency **USD** · MARR **15%** (per syllabus rule for USD) · Horizon **5 yr**
- Three alternatives evaluated: **Manual baseline**, **SaaS lease**, **In-house capital investment**
- Measures of worth: PW, AW, FW, Payback, IRR, B/C, Break-Even, Sensitivity
- All assumptions sourced from BLS, OSHA, Liberty Mutual WSI, Construction Industry Institute, Procore, OpenSpace, Buildots, NVIDIA, Axis, AWS, AGC, ENR, Dodge Data, and Glassdoor — see `financial-model/sources.md` and the **Sources** sheet of the workbook.

## Result

**Alternative 3 (In-House Capital Investment) is recommended.** It wins on every measure of worth; the incremental analysis vs. the manual baseline returns IRR ≈ 85%, B/C ≈ 3.10, and payback ≈ 1.1 years. The conclusion is robust under ±20% perturbation of initial investment and annual cost (see `13. Sensitivity` sheet).
