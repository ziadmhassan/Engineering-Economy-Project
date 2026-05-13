# Sources & References

Every numeric assumption in `Engineering_Economy_Analysis.xlsx` and `inputs.py`
traces back to one of the sources listed below. Same content as the
**15. Sources** sheet of the workbook.

> **Project context**: Mid-size U.S. metro general contractor with rolling
> high-rise pipeline. Anchor figures: 20-story Class-A commercial building,
> $50M total project value, ~$10M active construction value/year, MARR = 15%
> (USD per syllabus), study horizon = 5 years.

---

## Labor cost references

1. **BLS OES May 2024 — Occupational Health & Safety Specialists (SOC 29-9011)**
   <https://www.bls.gov/oes/current/oes299011.htm>
   Median annual wage **$81,140**. Loaded cost ≈ 1.45× per BLS Employer Costs for Employee Compensation.

2. **BLS OES May 2024 — Construction Managers (SOC 11-9021)**
   <https://www.bls.gov/oes/current/oes119021.htm>
   Median annual wage **$104,900**.

3. **BLS — Employer Costs for Employee Compensation (Sep 2024)**
   <https://www.bls.gov/news.release/ecec.htm>
   Benefits ≈ 29.5% of total compensation; total loading factor ≈ 1.42–1.48× base wage.

4. **Glassdoor / Levels.fyi — Machine-Learning Engineer median U.S. (2024)**
   <https://www.glassdoor.com/Salaries/machine-learning-engineer-salary-SRCH_KO0,25.htm>
   Base ~$130k → loaded ≈ $190k in mid-market geographies.

## Safety & risk references

5. **Liberty Mutual Workplace Safety Index 2024**
   <https://www.libertymutualgroup.com/about-lm/news/news-release-archive/articles/2024-workplace-safety-index>
   Top 10 disabling workplace injuries cost U.S. employers $58.6B/yr. Construction over-indexes vs. average industry.

6. **BLS Census of Fatal Occupational Injuries 2023 (CFOI)**
   <https://www.bls.gov/iif/oshcfoi1.htm>
   Construction = #1 industry for fatal injuries; ~1,069 deaths in 2022.

7. **OSHA — Penalties (FY 2024)**
   <https://www.osha.gov/penalties>
   Maximum civil penalties: $16,131 (serious violation), $161,323 (willful/repeated). Direct regulatory exposure factored into accident-cost figures.

## Rework & schedule references

8. **Construction Industry Institute — Cost of Rework (RT-153)**
   <https://www.construction-institute.org/resources/knowledgebase/best-practices/rework-management>
   Direct rework averages 5% of contract value; preventable portion via continuous monitoring ≈ 10–20%.

9. **ENR — 2024 Construction Industry Cost Indexes**
   <https://www.enr.com/economics>
   Used to validate labor & material cost magnitudes across U.S. metros.

10. **AGC of America — 2024 Construction Outlook Survey**
    <https://www.agc.org/learn/construction-data/2024-construction-outlook-survey>
    Labor cost and schedule pressure validation for U.S. high-rise contractors.

11. **Dodge Data & Analytics — Construction Risk Studies 2023**
    <https://www.construction.com/toolkit/reports>
    Risk-adjusted accident frequency for U.S. high-rise projects.

## Monitoring-system vendor pricing

12. **Procore Public Pricing 2024**
    <https://www.procore.com/pricing>
    Construction-management SaaS — typical mid-size project ≈ $15k/mo bundled.

13. **OpenSpace.ai — Capture pricing & case studies**
    <https://www.openspace.ai>
    AI 360° site capture; SaaS ≈ $3–5k/mo per project.

14. **Buildots — AI Monitoring Case Studies**
    <https://www.buildots.com/case-studies>
    Reports up to 50% reduction in schedule deviations on instrumented sites.

15. **Skydio X10 — Autonomous drone pricing**
    <https://www.skydio.com/skydio-x10>
    Enterprise autonomous inspection drone, base ≈ $25k incl. dock.

## In-house hardware references

16. **NVIDIA Jetson Orin AGX — Edge AI module**
    <https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/>
    Dev kit ≈ $2,000; production module ≈ $1,800.

17. **Axis Communications IP Cameras — pricing**
    <https://www.axis.com/products/network-cameras>
    Outdoor PTZ + analytics-capable IP cam ≈ $1,200–$2,500.

18. **AWS Pricing Calculator**
    <https://calculator.aws>
    EC2 g5.xlarge inference + S3 + Kinesis ≈ $1.5–2.5k/mo for the workload modeled.

## Inflation reference (informational)

19. **U.S. Bureau of Labor Statistics — Consumer Price Index**
    <https://www.bls.gov/cpi/>
    Used to disclose that the analysis is conducted in constant 2024 USD; MARR already includes a market risk premium so inflation is not double-counted.

---

## How sources were applied

| Sheet | Driver | Sources used |
|---|---|---|
| 02. Assumptions | MARR, study period | Syllabus rule |
| 03. CAPEX | Cameras / sensors / edge HW | 16, 17 |
| 03. CAPEX | Custom software dev cost | 4 |
| 03. CAPEX | Networking, install | 9 |
| 04. OPEX | Supervisor wages | 1, 3 |
| 04. OPEX | ML engineer wage | 4 |
| 04. OPEX | SaaS / lease pricing | 12, 13, 14 |
| 04. OPEX | Cloud infra | 18 |
| 04. OPEX | Accident-related cost | 5, 6, 7 |
| 04. OPEX | Rework cost | 8 |
| 04. OPEX | Schedule-slip penalties | 10, 11 |
| 12. Break-Even | Labor break-even | 1, 3 |
| 12. Break-Even | Accident-freq break-even | 5, 11 |
| 13. Sensitivity | Driver bands | All applicable |
