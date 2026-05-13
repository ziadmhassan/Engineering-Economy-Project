# Economic Analysis of Autonomous Site Monitoring Systems for Large-Scale Construction Projects

**Course:** ENGR 3222 — Engineering Economy
**Term:** Spring 2026
**Institution:** The American University in Cairo (AUC)
**Analysis Date:** 14 May 2026
**Currency:** USD · **MARR:** 15% · **Study Period:** 5 years

### Team

| Name        | ID         | Department               | Perspective |
|-------------|-----------:|--------------------------|-------------|
| Ziad Hassan | 900213728  | Computer Engineering     | Hardware lifecycle, data pipeline, edge-AI infrastructure |
| Ahmed Anton | 900253324  | Construction Engineering | Site operations, schedule, safety, rework |

---

## 1. Executive Summary

A mid-size U.S. metro general contractor running a rolling pipeline of high-rise
projects (anchor: a 20-story Class-A commercial building, **$50M total project
value**, **≈ $10M of active construction value per year**) is evaluating whether
to replace manual safety/quality supervision with an automated monitoring system.

Three alternatives are compared over a **5-year horizon** at **MARR = 15%** in
**constant U.S. dollars**:

1. **Alt 1 — Manual Baseline** (status quo)
2. **Alt 2 — SaaS Lease** (rent hardware + software from a vendor)
3. **Alt 3 — In-House Capital Investment** (buy hardware, build software)

The three alternatives deliver the **same service** (continuous site monitoring),
so a **cost-minimization analysis** is used. Present, annual and future worth all
identify the same winner. Incremental rate-of-return and benefit/cost analyses
versus the do-nothing baseline confirm the choice. The conclusion is robust under
±20% perturbation of every major cost driver.

> **Recommendation — Adopt Alternative 3 (In-House Capital Investment).** It is
> the least-cost option on PW, AW, and FW; the incremental investment vs. Alt 1
> earns **IRR ≈ 86 %** (well above MARR) and a **B/C ratio of 2.88**.

| Measure                                | Alt 1 — Manual  | Alt 2 — SaaS    | **Alt 3 — In-House** |
|----------------------------------------|----------------:|----------------:|---------------------:|
| Initial Investment                     |     $10,000     |     $25,000     |     **$380,000**     |
| Annual Cost                            |    $555,000     |    $376,000     |     **$225,000**     |
| Y5 Salvage                             |          $0     |          $0     |      **$80,000**     |
| **Present Worth (cost)**               | −$1,870,446     | −$1,285,410     |   **−$1,094,461** ✓  |
| Annual Worth                           |   −$557,983     |   −$383,458     |     **−$326,495**    |
| Future Worth                           | −$3,762,135     | −$2,585,419     |   **−$2,201,352**    |

---

## 2. Problem Statement and Scope

### 2.1 Background
Traditional U.S. high-rise construction relies on safety and quality supervisors
performing manual walk-arounds, paper-based checklists and ad-hoc photographic
documentation. Three industry pressures push contractors to reconsider this:

- **Labor scarcity & cost** — BLS reports double-digit wage inflation for OHS
  Specialists since 2021.
- **Safety exposure** — Liberty Mutual's 2024 Workplace Safety Index puts the
  cost of the top-10 disabling injuries at **$58.6 B/yr**; construction
  over-indexes vs. the industrial average and remains the #1 industry for fatal
  injuries (BLS CFOI 2023).
- **Rework** — The Construction Industry Institute (RT-153) documents that
  direct rework averages **5% of contract value** and that **10–20%** of it is
  preventable with continuous monitoring.

Automated, AI-driven site monitoring (edge-AI cameras + IoT sensors + analytics
software) is now mature enough to be deployed at scale, but the right
procurement model (rent vs. own) is the open question.

### 2.2 Problem Statement
*Given a mid-size U.S. metro contractor operating a $10M/yr active construction
pipeline anchored by a 20-story Class-A commercial high-rise, determine which of
three alternative supervision strategies minimizes the total economic cost of
site monitoring over a 5-year planning horizon at MARR = 15%, and verify the
conclusion is robust under reasonable parameter variation.*

### 2.3 Scope Boundaries

- **Currency:** USD (mid-2024 dollar levels).
- **Horizon:** 5 years (matches typical capital depreciation horizon for IT
  hardware and a contractor's medium-term planning cycle).
- **Analysis basis:** Constant (real) dollars. Inflation is **not** modeled —
  the 15% MARR is treated as a real discount rate, and every line item is held
  flat year-on-year for internal consistency.
- **Tax/depreciation:** Not modeled (course is pre-tax unless specified).
- **Service equivalence:** All three alternatives deliver continuous site
  monitoring of equivalent scope; the analysis is therefore one of
  **cost-minimization**, not full NPV with revenue.

---

## 3. Alternatives

### 3.1 Alternative 1 — Manual Baseline (Status Quo)
Three loaded safety/quality supervisors walk the site, file incident reports,
and run weekly QA. No specialized monitoring technology beyond tablets and a
site safety office.

- **Initial Investment** — $10,000 site fitout (one-time).
- **Annual Cost** — $555,000 = 3 supervisors @ $130k loaded + accident-related
  cost ($75k) + preventable rework ($50k = 0.5% × $10M) + schedule-slip
  penalties ($40k).
- **Salvage** — $0.

### 3.2 Alternative 2 — SaaS Lease
Vendor (Procore + OpenSpace tier) provides the hardware (leased), the AI
software, and the capture pipeline as a monthly service. One in-house
oversight supervisor remains to review dashboards and approve exceptions.

- **Initial Investment** — $25,000 setup, training, integration.
- **Annual Cost** — $376,000 = SaaS subscription ($180k) + hardware lease
  ($36k) + 1 oversight supervisor ($130k) + residual accident cost ($20k) +
  residual rework ($10k = 0.1% × $10M).
- **Salvage** — $0 (rented assets).

### 3.3 Alternative 3 — In-House Capital Investment
Contractor purchases edge-AI cameras (Axis + NVIDIA Jetson), IoT sensors,
networking, and pays two in-house engineers for six months to build the
software stack. Operates on AWS with one full-time ML/IT engineer.

- **Initial Investment** — $380,000 = 30 edge-AI cameras ($60k) + 80 IoT
  sensors ($20k) + 2 edge servers ($30k) + networking/install ($40k) +
  software dev ($180k = 2 eng × 6 mo loaded) + PM/training/10% contingency
  ($50k).
- **Annual Cost** — $225,000 = ML/IT engineer ($145k) + AWS/DB/licensing
  ($30k) + HW maintenance ($25k) + residual accident cost ($15k) + residual
  rework ($10k).
- **Y5 Salvage** — $80,000 (≈ 21% of HW initial — depreciated resale of
  cameras + servers).

---

## 4. General Assumptions

| Symbol | Parameter | Value | Source / Basis |
|---|---|---:|---|
| **MARR** | Minimum Attractive Rate of Return | **15%** | Syllabus rule for USD |
| **n** | Study Period | **5 years** | Project proposal |
| **TPV** | Total Project Value (anchor) | **$50,000,000** | RS Means 2019 — 11–20 story office, U.S. |
| **AVY** | Active Construction Value / Year | **$10,000,000** | Derived rolling-pipeline average |
| Headcount | Avg. on-site headcount | 180 | Dodge Data 2023 |
| Loading factor | Wage → loaded compensation | 1.42 – 1.48 × | BLS ECEC Sep-2024 |
| Rework — baseline | Preventable rework share, manual | 0.5% of AVY | CII RT-153 |
| Rework — instrumented | Residual rework, AI-monitored | 0.1% of AVY | CII RT-153 |
| Accident cost (avg.) | Disabling-injury class avg. | $50,000 | Liberty Mutual WSI 2024 |
| Accident frequency — manual | Annual disabling incidents | 1.5 | Liberty Mutual + Dodge |
| Accident frequency — SaaS | Residual | 0.4 | Buildots case studies |
| Accident frequency — In-House | Residual | 0.3 | Buildots case studies |

### Why no inflation, no taxes, no depreciation?

- **Inflation** — Removing it keeps the cash-flow table interpretable. The 15%
  MARR is read as a *real* rate, and each cost line is treated as a real-dollar
  annuity. A nominal-rate version would require an inflation premium on MARR
  *and* an escalation rate on every line item; the two layers cancel almost
  perfectly to first order, so we keep the simpler constant-dollar
  formulation.
- **Taxes** — Out of scope per course convention; would only further favor
  Alt 3 (depreciation shield on the $380k capital base).
- **Depreciation** — Captured indirectly via the $80k Y5 salvage; not separately
  scheduled because the analysis is pre-tax.

---

## 5. Cash Flow Analysis

### 5.1 Cash-flow tables (USD, costs shown as negative)

#### Alternative 1 — Manual Baseline

| Year | Y0 | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|---:|
| Initial Investment | −10,000 | 0 | 0 | 0 | 0 | 0 |
| Annual Cost | 0 | −555,000 | −555,000 | −555,000 | −555,000 | −555,000 |
| **Net Cash Flow** | **−10,000** | **−555,000** | **−555,000** | **−555,000** | **−555,000** | **−555,000** |
| Discount factor 1/(1.15)ᵗ | 1.0000 | 0.8696 | 0.7561 | 0.6575 | 0.5718 | 0.4972 |
| Discounted CF | −10,000 | −482,609 | −419,660 | −364,922 | −317,323 | −275,933 |
| **Cumulative Discounted CF → PW** | −10,000 | −492,609 | −912,268 | −1,277,190 | −1,594,513 | **−1,870,446** |

#### Alternative 2 — SaaS Lease

| Year | Y0 | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|---:|
| Initial Investment | −25,000 | 0 | 0 | 0 | 0 | 0 |
| Annual Cost | 0 | −376,000 | −376,000 | −376,000 | −376,000 | −376,000 |
| **Net Cash Flow** | **−25,000** | **−376,000** | **−376,000** | **−376,000** | **−376,000** | **−376,000** |
| Discounted CF | −25,000 | −326,957 | −284,310 | −247,226 | −214,979 | −186,938 |
| **Cumulative Discounted CF → PW** | −25,000 | −351,957 | −636,267 | −883,493 | −1,098,472 | **−1,285,410** |

#### Alternative 3 — In-House Capital Investment

| Year | Y0 | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|---:|
| Initial Investment | −380,000 | 0 | 0 | 0 | 0 | 0 |
| Annual Cost | 0 | −225,000 | −225,000 | −225,000 | −225,000 | −225,000 |
| Salvage (Y5) | 0 | 0 | 0 | 0 | 0 | +80,000 |
| **Net Cash Flow** | **−380,000** | **−225,000** | **−225,000** | **−225,000** | **−225,000** | **−145,000** |
| Discounted CF | −380,000 | −195,652 | −170,132 | −147,941 | −128,644 | −72,091 |
| **Cumulative Discounted CF → PW** | −380,000 | −575,652 | −745,784 | −893,726 | −1,022,370 | **−1,094,461** |

### 5.2 Equivalent worth — PW · AW · FW

Using the standard factor identities at i = 15 %, n = 5:

> (P/A, 15%, 5) = 3.3522 (P/F, 15%, 5) = 0.4972
> (A/P, 15%, 5) = 0.2983 (F/P, 15%, 5) = 2.0114

**Formulas** (costs treated as outflows; salvage as inflow at Y5):

```
PW = −Initial − AnnualCost × (P/A, i, n) + Salvage × (P/F, i, n)
AW = PW × (A/P, i, n)
FW = PW × (F/P, i, n)
```

| Measure | Alt 1 | Alt 2 | **Alt 3** |
|---|---:|---:|---:|
| PW | −$1,870,446 | −$1,285,410 | **−$1,094,461** |
| AW | −$557,983 | −$383,458 | **−$326,495** |
| FW | −$3,762,135 | −$2,585,419 | **−$2,201,352** |

All three worth measures rank the alternatives identically (Alt 3 best, Alt 2
second, Alt 1 worst), which is mathematically guaranteed by the AW = PW × (A/P)
and FW = PW × (F/P) transformations.

### 5.3 Equivalence sanity check — Alt 3

```
PW = −380,000 − 225,000 × 3.3522 + 80,000 × 0.4972
   = −380,000 − 754,245 + 39,774
   = −1,094,471                        ✓  (Excel: −1,094,461, rounding)
```

---

## 6. Rate-of-Return Analysis (Incremental IRR)

Because Alt 1 has the lowest Initial Investment it is treated as the
do-nothing baseline. The incremental cash flow `(B − A)` is the *avoided cost*
of choosing the higher-investment option.

### 6.1 Incremental Alt 3 vs Alt 1

| Year | Y0 | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|---:|
| Δ Initial | −370,000 | | | | | |
| Δ Annual savings | | +330,000 | +330,000 | +330,000 | +330,000 | +330,000 |
| Δ Salvage | | | | | | +80,000 |
| **Δ Net** | **−370,000** | **+330,000** | **+330,000** | **+330,000** | **+330,000** | **+410,000** |

Set NPV = 0 and solve for i:

```
0 = −370,000 + 330,000 × (P/A, i*, 5) + 80,000 × (P/F, i*, 5)
⇒ i* ≈ 86.0 %                          (Excel IRR: 86.02 %)
```

**IRR (86%) ≫ MARR (15%) → ACCEPT.**

### 6.2 Incremental Alt 2 vs Alt 1

| Year | Y0 | Y1 … Y5 |
|---|---:|---:|
| Δ Net | −15,000 | +179,000 |

`(P/A, i*, 5) = 15,000 / 179,000 = 0.0838 → i* ≈ 1,193 %.`

The IRR is enormous only because the differential capital ($15k) is trivial
relative to the recurring savings ($179k/yr); the metric is still well above
MARR — accept Alt 2 over Alt 1.

### 6.3 Why Alt 3 still wins
Both Alt 2 and Alt 3 individually beat MARR vs Alt 1, so a final **Alt 3 vs Alt 2**
incremental check is needed. The PW and AW comparison already does this
implicitly: Alt 3's PW is **$190,950 less negative** than Alt 2's, equivalent to
$56,963/yr of avoided cost on a $355,000 incremental investment — well clear of
MARR.

---

## 7. Benefit / Cost Ratio

Benefits are defined as **avoided costs** vs Alt 1 (manual baseline). Costs are
the **incremental Initial Investment**.

| Pair (B vs A) | Δ Initial (PW Costs) | Annual Savings | Δ Salvage | PW Benefits | **B/C** | Decision |
|---|---:|---:|---:|---:|---:|---|
| Alt 2 vs Alt 1 | $15,000 | $179,000 | $0 | $600,036 | **40.00** | ACCEPT |
| **Alt 3 vs Alt 1** | $370,000 | $330,000 | $80,000 | $1,066,437 | **2.88** | **ACCEPT** |
| Alt 3 vs Alt 2 | $355,000 | $151,000 | $80,000 | $466,401 | **1.31** | ACCEPT |

`PW(Benefits) = (Annual Savings) × (P/A, 15%, 5) + (Δ Salvage) × (P/F, 15%, 5)`

All three pair-wise B/C ratios exceed 1, confirming the rate-of-return result.

---

## 8. Break-Even Analysis

The break-even question we care most about: **how cheap would supervisor labor
have to become for the manual baseline to remain competitive with Alt 3?**

### Setup
- Hold every non-labor line in Alt 1 fixed (accident, rework, schedule slip = $165,000/yr combined).
- Let `L` = loaded annual cost per supervisor. Alt 1 annual cost becomes `3 L + 165,000`.
- Solve: Alt 1 AW = Alt 3 AW.

```
AW_alt1 = −(3L + 165,000) − 10,000 × (A/P, 15%, 5)
        = −3L − 165,000 − 2,983

AW_alt3 = −326,495

Set them equal:
−3L − 167,983 = −326,495
3L = 158,512
L  = 52,837 /supervisor/yr
```

### Interpretation
The BLS-median loaded cost of an Occupational Health & Safety Specialist (SOC
29-9011) is roughly **$118,000**/yr. The break-even point of **$52,837** is
less than half of that — i.e., the manual baseline would only win if loaded
supervisor cost fell by **55 %**, which is implausible in any U.S. metro
market.

---

## 9. Sensitivity Analysis

Each driver is perturbed independently, holding all others at baseline, and the
swing in Alt 3 PW is recorded. The "swing" column is the absolute distance
between the high and low PW.

| Driver | Low PW | Baseline PW | High PW | Swing |
|---|---:|---:|---:|---:|
| **Annual Cost ±20 %** | −$943,614 | −$1,094,461 | −$1,245,308 | **$301,694** |
| MARR ±5 pp | −$1,183,253 | −$1,094,461 | −$1,020,738 | $162,516 |
| Initial Investment ±20 % | −$1,018,461 | −$1,094,461 | −$1,170,461 | $152,000 |
| Accident frequency ±50 % | −$1,069,320 | −$1,094,461 | −$1,119,602 | $50,282 |
| Salvage value ±50 % | −$1,114,348 | −$1,094,461 | −$1,074,574 | $39,774 |

### Tornado interpretation
- **Annual Cost** is by far the most influential lever (≈ 2× the next driver).
  This is intuitive: at MARR = 15 %, $1 of annual cost is worth $3.35 in PW.
- Even at the *worst* combined corner (Annual Cost +20 %, Initial +20 %, MARR
  −5 pp, Salvage −50 %), Alt 3's PW (≈ −$1.45 M) is still less negative than
  Alt 1's baseline PW (−$1.87 M).
- **The recommendation is robust** to any single-driver perturbation and to
  reasonable combined adverse perturbations.

---

## 10. Side-by-Side Summary

| Measure | Alt 1 — Manual | Alt 2 — SaaS | **Alt 3 — In-House** |
|---|---:|---:|---:|
| Initial Investment | $10,000 | $25,000 | $380,000 |
| Annual Cost | $555,000 | $376,000 | $225,000 |
| Y5 Salvage | $0 | $0 | $80,000 |
| Present Worth | −$1,870,446 | −$1,285,410 | **−$1,094,461** |
| Annual Worth | −$557,983 | −$383,458 | **−$326,495** |
| Future Worth | −$3,762,135 | −$2,585,419 | **−$2,201,352** |
| Incremental IRR vs Alt 1 | — | 1,193 % | **86.0 %** |
| Incremental B/C vs Alt 1 | — | 40.00 | **2.88** |
| Break-even labor (per sup.) | $52,837 | — | — |
| Sensitivity rank | Worst | Middle | **Best** |

---

## 11. Recommendation

### Decision: **Adopt Alternative 3 — In-House Capital Investment**

Alternative 3 wins every measure of worth (PW, AW, FW), passes the incremental
rate-of-return test (IRR 86 % ≫ MARR 15 %), and clears the benefit/cost
threshold (B/C 2.88 > 1). The 5-year cost saving versus the manual baseline is
**≈ $776,000 in present-worth terms**, equivalent to **≈ $231,000 per year**.

### Why not Alt 2 (SaaS)?
Alt 2 also beats Alt 1, but it loses to Alt 3 on every cumulative measure and
hands the contractor a recurring $216 k/yr subscription/lease bill with no
asset ownership and limited customization. The contractor's rolling pipeline
amortizes the Alt 3 hardware across multiple jobs, magnifying the advantage
beyond what the single-project model shows.

### Engineering perspectives

- **Construction Engineering** — The recurring labor and rework savings come
  from continuous, exception-driven supervision rather than calendar-driven
  walk-arounds. Buildots and OpenSpace case studies report up to 50 %
  schedule-deviation reduction on instrumented sites, which in our model maps
  to the residual rework rate dropping from 0.5 % to 0.1 % of $10 M and
  accident frequency dropping from 1.5 to 0.3 incidents/yr.
- **Computer Engineering** — A 5-year horizon matches typical edge-hardware
  refresh cycles (cameras + Jetson Orin modules ≈ 5–7 yr). One full-time
  ML/IT engineer is sufficient to retrain models quarterly and operate the
  AWS pipeline (`g5.xlarge` inference + S3 + Kinesis ≈ $2.5 k/mo).

### Risks and mitigations

| Risk | Mitigation |
|---|---|
| Capital overrun on custom software | $50 k (≈ 13 %) contingency baked into Initial Investment |
| Model accuracy degrades over time | Annual retraining is included in the $145 k loaded ML engineer cost |
| Hardware obsolescence | Salvage assumed at 21 % of HW Initial; conservative vs. typical 30–40 % resale on Axis/Jetson 5-yr-old gear |
| Vendor lock-in (counter-argument for Alt 2) | Mitigated by open-stack choice (Axis ONVIF cameras, NVIDIA Jetson, open-source ML pipeline) |

---

## 12. Conclusion

The in-house capital investment is the most cost-effective monitoring strategy
for a mid-size U.S. contractor running a $10 M/yr active construction pipeline,
saving roughly **$776 k in PW** (or **$231 k/yr in AW**) over five years
compared with the manual baseline. The result is robust to ±20 % perturbation
of every major cost driver and remains attractive even under the worst
plausible combined-corner scenario.

The conclusion supports the project's central hypothesis: **the reduction in
human error, accident frequency, and preventable rework comfortably justifies
the elevated initial capital expenditure in modern edge-AI monitoring
technology.**

---

## 13. References

Numbered references match the **14. Sources** sheet in the workbook and the
`SOURCES` dictionary in `financial-model/inputs.py`.

1. **BLS OES May 2024** — Occupational Health & Safety Specialists (SOC 29-9011). U.S. Bureau of Labor Statistics. <https://www.bls.gov/oes/current/oes299011.htm>
2. **BLS OES May 2024** — Construction Managers (SOC 11-9021). U.S. Bureau of Labor Statistics. <https://www.bls.gov/oes/current/oes119021.htm>
3. **BLS Employer Costs for Employee Compensation, Sep 2024.** U.S. Bureau of Labor Statistics. <https://www.bls.gov/news.release/ecec.htm>
4. **Liberty Mutual Workplace Safety Index 2024.** Liberty Mutual Insurance. <https://www.libertymutualgroup.com/about-lm/news/news-release-archive/articles/2024-workplace-safety-index>
5. **BLS Census of Fatal Occupational Injuries 2023 (CFOI).** <https://www.bls.gov/iif/oshcfoi1.htm>
6. **OSHA Penalties (FY 2024).** U.S. Department of Labor. <https://www.osha.gov/penalties>
7. **Construction Industry Institute — Cost of Rework (RT-153).** <https://www.construction-institute.org/resources/knowledgebase/best-practices/rework-management>
8. **ENR 2024 Construction Industry Cost Indexes.** Engineering News-Record. <https://www.enr.com/economics>
9. **Procore Public Pricing 2024.** Procore Technologies. <https://www.procore.com/pricing>
10. **OpenSpace.ai Capture pricing & case studies.** OpenSpace Labs Inc. <https://www.openspace.ai>
11. **Buildots AI Monitoring — Case Studies.** Buildots. <https://www.buildots.com/case-studies>
12. **Skydio X10 autonomous drone pricing.** Skydio Inc. <https://www.skydio.com/skydio-x10>
13. **NVIDIA Jetson Orin AGX — Edge AI module.** NVIDIA. <https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/>
14. **Axis Communications IP Cameras — pricing.** Axis Communications. <https://www.axis.com/products/network-cameras>
15. **AWS Pricing Calculator.** Amazon Web Services. <https://calculator.aws>
16. **Glassdoor / Levels.fyi — ML/Data Engineer median U.S. (2024).** <https://www.glassdoor.com/Salaries/machine-learning-engineer-salary-SRCH_KO0,25.htm>
17. **Dodge Data & Analytics — Construction Risk Studies 2023.** <https://www.construction.com/toolkit/reports>
18. **AGC of America — 2024 Construction Outlook Survey.** <https://www.agc.org/learn/construction-data/2024-construction-outlook-survey>
19. **RS Means — Construction Cost Estimates, Office 11–20 Story (National, U.S.), 2019.** <https://www.rsmeans.com/model-pages/office-11-20-story>

---

## Appendix A — Companion artifacts

| Artifact | Path |
|---|---|
| Full Excel financial model (15 sheets, native formulas, charts) | `financial-model/output/Engineering_Economy_Analysis.xlsx` |
| Source of truth (Python) | `financial-model/inputs.py`, `financial-model/build_excel.py` |
| Bibliography | `financial-model/sources.md` |
| Slide deck (React, deployed via GitHub Pages) | `slides/` · live at the Pages URL of the repo |

## Appendix B — Compound-interest factors used

At i = 15 %, n = 5:

```
(P/A, 15%, 5) = [ (1.15)^5 − 1 ] / [ 0.15 · (1.15)^5 ] = 3.35216
(P/F, 15%, 5) = 1 / (1.15)^5                          = 0.49718
(A/P, 15%, 5) = 1 / (P/A, 15%, 5)                     = 0.29832
(F/P, 15%, 5) = (1.15)^5                              = 2.01136
```
