# Beginner learning redesign: first reviewable slice

Current2026-10-02scope supersedes earlier query-preservation decisions: root is teaching-only, old query console/data retired. See .planning/retire-query-console for implementation and acceptance; previous decisions below are historical.

## Goal
Deliver the confirmed knowledge directory, a reviewable beginner-homepage prototype and one complete photolithography teaching sample with genuine three-dimensional animation. Do not silently treat this sample as the completed whole-site redesign.

## Confirmed requirements
Zero electronic/physical/semiconductor background. Explain semiconductor/wafer/chip differences, how chips are made and design/manufacturing/packaging/testing relationships. Include basic materials, chip categories/applications, industry roles, manufacture and common concepts/misconceptions. Wafer manufacturing gets more depth. Focus on purpose/process rather than prerequisite device physics or formulas. Homepage intro then overview/recommended path. Summary before expandable detail; plain explanation before formal terminology. Explain acronyms inline. Three-dimensional video-like animations, equipment and wafer changes equally important; play/pause/steps/replay, no model interaction. Aim for animation on every core point in the eventual site. Teaching simplifications explicitly labelled. Desktop first/mobile readable. No accounts, progress tracking or quizzes. Existing company/equipment/search/comparison are an independent reference tool.

## Current scope / decisions
- Preview at /learn.html and /lithography.html; existing / and API/data remain unchanged until sample approval. Prototype links must indicate which content exists versus directory-only planned chapters.
- Native HTML/CSS/JavaScript and a bounded native WebGL teaching scene; no package/framework/account dependency, no external runtime asset or undocumented machine recipe. Animation is a 3D educational reconstruction, not verified vendor hardware or actual-speed/scale footage.
- Written requirements/directory/storyboard under docs/beginner-learning.md; source evidence adjacent to authored lesson.
- Do not reset DB, change seed version, modify manufacturer records or deploy elsewhere. New public assets are served by the existing local server without restart.

## Phases
### Phase 1: Restore and evidence
Status: complete
- Restore existing plans, service identity and current files; preserve a consistent backup.
- Verify primary explanatory sources for definitions, industry overview and the photolithography sequence.

### Phase 2: Reviewable prototype and sample
Status: complete
- Save confirmed requirements, knowledge hierarchy, homepage structure and sample storyboard.
- Implement beginner homepage and complete lithography page with equal equipment/material views and accessible transport controls.

### Phase 3: Acceptance and handoff
Status: complete
- Verify semantic content, all local links, animation control/state/frame changes, reduced-motion/hidden-tab behavior, WebGL failure fallback, keyboard and 1440/390/320 layout.
- Check original tool still passes regression and original data/history exactly match snapshot. Inspect screenshots and hand off sample for approval, not claim full-content rollout.

## Outcome
First reviewable slice verified on live loopback service without restart or DB changes. Seven-chapter directory, readable introductory concepts/overview and complete lithography teaching sample delivered. User still needs to review educational depth and animation fidelity before full-site replacement/expansion. Full beginner website and photoreal/vendor-accurate models are not claimed complete.

## Errors / constraints
- Default sandbox setup failed in prior runs; use approved scoped elevated commands.
- No Git repository. No relevant memory matches for Fab/wafer/8787.
- Combined prior-plan read truncated; read necessary remaining sections separately. Existing server PID 25476 on loopback8787, original data 209/185/164.

## Continued development: 2026-10-01
### Phase 4: Complete introductory reading
Status: complete
- Add readable content for all seven chapters; fabrication receives more depth. Explain purpose, equipment, before/after and terminology without requiring device physics.
- Use a static chapter reader with anchors/native details so content remains readable without JavaScript. Preserve the independent reference homepage.
### Phase 5: Extend synchronized 3D teaching
Status: complete
- Reuse the existing WebGL renderer/transport for materials preparation, a film-patterning cycle and a flip-chip assembly/test example.
- Explicitly distinguish complete introductory text from animation coverage, and simplified routes from universal recipes.
### Phase 6: Verify expansion
Status: complete
- Check all links, seven chapter content, semantic invariants, all four animations, controls, keyboard, fallback, reduced motion and 1440/390/320 layouts.
- Re-run original product tests and compare original assets/data against backup. No DB migration/reset or homepage replacement.

### Current-turn errors
- Default exec helper setup still fails; approved scoped elevated reads work. Combined skill output truncated; missing portion re-read separately.
- package.json does not exist (plain Node application); use the existing direct Node test commands.
- Backup SQL inline quoting failed before DB execution; corrected using a PowerShell here-string script passed to Node. Snapshot succeeded; current raw counts 209/189/164/history0.
- Guessed CMP US path and Micron introductory PDF returned 404; use verified primary alternatives in authored content.
- Concurrent teaching/software-WebGL and original-tool headless runs failed on CDP evaluate/page-ready timeouts after teaching 1440/390 passed; preserve assertions and rerun browsers serially to avoid resource contention. No application exception was recorded.
- Serial teaching and full original-tool regression both passed. Final strengthened test with beyond-viewport scene captures timed out waiting for restart progress; add scene/context/visibility diagnostics before changing code or assertions.

## Expansion outcome
Seven static introductory chapters and four synchronized native WebGL lessons delivered. Final teaching regression passed at1440/390/320 with real pixels/frame changes, patterning geometry invariants, transport/keyboard/end/replay, reduced motion, hidden-page events, WebGL fallback/context loss, no-script reader and invalid/prototype routes. Final screenshots inspected; packaging contacts now visible through labelled cutaway. Original complete tool regression passed; independent8-table comparison matches expansion snapshot, integrity ok, seed_version5, source history0, original index/app/styles unchanged, service remains PID25476. Query-log rows can grow from normal read-only HTTP queries; no source/industry records edited. No restart or dependency added.

Remaining product work: not every core topic has its own animation (applications/design/metrics, implant/heat/CMP/multilevel interconnect); models are functional simplifications, not vendor-accurate or photoreal. /learn.html is the educational preview and / remains the reference tool; homepage replacement is not part of this phase.

## Next manufacturing expansion
### Phase 7: Restore and specify four routes
Status: complete
- Preserve preview/test/source and consistent data backup. Confirm primary evidence for ion implantation, anneal, CMP and multilevel interconnect.
- Define explicit before/after states, visual teaching codes and route limitations; never depict implantation as a new coating or heating as dopant removal.
### Phase 8: Implement four synchronized demonstrations
Status: complete
- Add ion-implant, anneal, CMP and multilevel-interconnect scenes to the existing fixed catalog/player. Add chapter/home entries and appropriate follow-on links.
- Show actual geometry for CMP overburden removal and dielectric/via/metal connections. Property-only changes must be labelled as representations rather than actual colour changes.
### Phase 9: Verify and hand off
Status: complete
- Extend existing browser harness with all four scenes, geometry/state invariants, actual frames, controls/end/replay, keyboard, reduced motion, fallback and1440/390/320.
- Run browser suites serially; compare eight original data tables and reference assets with backup, inspect screenshots and document remaining coverage.

## Manufacturing expansion outcome
Four new lessons delivered through the existing player; eight total, six fabrication lessons. Final teaching QA passed1440/390/320, real WebGL pixels / stage motion, geometry invariants, native keyboard, transport, reduced-motion / hidden / context-loss fallback and no-script static reader. Full original reference regression passed on unchanged-assertion serial rerun after one recorded CDP navigation timeout. Post-regression eight data-table and db_meta comparison matches current backup, integrity ok; original query HTML/JS/CSS untouched. Service still25476 on8787; no reset, restart, new dependency or original-source edit.

Remaining coverage: independent cleaning, metrology/inspection, design, applications and conceptual-metric animations. Preview remains /learn.html, / remains the reference tool. Functional teaching reconstruction and labelled cutaways are not actual vendor equipment or a production recipe; no claim of full-site animation completion.

## Cleaning and process-feedback expansion
### Phase 10: Restore, preserve and verify evidence
Status: complete
- Verify current lesson catalog/live files, preserve consistent backup, identify any changed state before extending.
- Confirm primary process references and specify separate cleaning, film-thickness metrology and optical defect-inspection routes.
### Phase 11: Add three synchronized lessons
Status: complete
- Reuse fixed catalog/player; explain purpose, equipment, before/after and output information with explicit teaching limits.
- Cleaning removes selected residues while preserving useful material. Metrology/inspection preserve material and defects; markers are not actual data or repair.
### Phase 12: Verify and hand off
Status: complete
- Extend actual-frame and geometry tests, transport/keyboard/fallback/reduced motion and1440/390/320 layout. Review screenshots.
- Run original tool regression serially and independently compare data/reference assets with this turn's snapshot. Document remaining coverage.

### Feedback-phase errors
- Optional .agents directory was absent; no applicable AGENTS file found. User-provided instructions remain in effect. Combined long outputs were truncated and necessary skill/source sections re-read separately.
- KLA film-detail and SCREEN spin-cleaner detail open failed, and old Filmetrics technology redirected to an overview; used accessible primary Hamamatsu/TEL/KLA/Applied explanatory sources, without vendor-specification claims.
- First geometry run counted the foundation's blue status screen as a film strip in the equipment-rotation assertion; identify the actual strip by its thickness before asserting rigid rotation. Material invariants stay unchanged.
- Screenshot read was attempted before the failed run had produced new images; wait for successful scene captures before visual review.

## Process-feedback outcome
Delivered three five-step scenes for single-wafer cleaning, optical film-thickness metrology and optical defect inspection;11total lessons/9fabrication lessons. Final native-WebGL teaching QA passed1440/390/320, actual pixels/motion, geometry invariants, controls/native keyboard, reduced motion, hidden pause, context loss and no-script reading. Final serial original-tool regression exited0 with no JavaScript exceptions. Post-regression8industry/source tables plus metadata equal before-feedback snapshot, integrity ok/version5; query_log can grow through normal requests. Original query assets and shared player/CSS/lithography sample unchanged. No restart, migration, dependency, account or progress tracking added.

Still remaining: independent design, applications and conceptual-metric animations and other product routes; full-content completion or real vendor equipment fidelity is not claimed. /learn.html remains the educational preview and / the independent reference tool.

## Design and application expansion
### Phase 13: Restore and preserve
Status: complete
- Restore catalog, reader and tests; snapshot public/tests/docs/README and read-only SQLite before-design-applications-20261001. Service PID25476 on8787.
- Specify design-data versus material and system-role versus physical-chip boundaries.
### Phase 14: Implement two lessons
Status: complete
- Reuse native geometry/player; optional domain labels for design and application views, no new dependencies or source-data changes.
- Six design steps from requirements to data handoff, six photo-system roles with parallel power and temporary versus persistent storage.
### Phase 15: Verify and hand off
Status: complete
- Add semantic geometry checks; retain actual-frame, playback, fallback and1440/390/320 gates for all13lessons.
- Inspect screenshots, run original query regression serially, independently compare snapshot and metadata; update coverage and limitations.

### Current phase errors
- Initial plan read used workspace .planning rather than Fab/app/.planning; corrected immediately. Long combined output truncated; necessary excerpts re-read.
- PowerShell double-quoted inline Node snapshot command lost escaped quotes; no database mutation occurred. Completed using a literal here-string piped to Node.

## Design/application outcome
Two six-step lessons delivered,13total/9fabrication. Final teaching browser suite passed1440/390/320: actual WebGL pixels, motion, data/layout invariants, continuous parallel power paths, domain labels, transport/native keyboard, reduced motion, hidden pause, context loss and no-script fallback. Desktop and mobile screenshots inspected after bounded new-scene scale adjustment. Original query suite serial run exited0, zero JS exceptions; eight industry/source tables and db_meta match this phase snapshot, integrity ok/version5. Original index/app/styles, learning CSS and independent lithography HTML unchanged. Shared player only gains optional domain-specific accessible canvas names; old manufacturing names remain default. Service still PID25476, no restart/database reset/new dependency. Browser preview open request queued, not claimed already displayed.

Remaining: conceptual-metric independent animation and other product routes. Teaching models and data/function representations are not actual tools/equipment or performance evidence. /learn.html remains preview, / remains original reference tool.

## Conceptual metrics expansion
### Phase 16: Restore and preserve evidence
Status: complete
- Current13lessons, chapter7 text, optional view labels and service PID25476 restored; consistent before-metrics-20261001 snapshot saved, integrity ok.
- Three independent concept lessons: node names versus structure dimensions, wafer diameter versus fixed-size sites, defined-scope yield classification. No real company data or process prediction.
### Phase 17: Implement teaching examples
Status: complete
- Reuse catalog/player and domain labels. Add nodes/wafers/yield five-step scenes, chapter links, accessible non-colour result cues and explicit teaching assumptions.
- Keep wafer radius ratio1.5 and site sizes fixed; yield keeps20evaluated sites and18/2 outcomes without removing/repairing structures; node comparison is abstract, not a benchmark.
### Phase 18: Verify and hand off
Status: complete
- Extend native browser frame/control/fallback and semantic geometry gates for16lessons at1440/390/320; review screenshots.
- Run original tool suite serially, compare original assets and8tables+metadata to current backup, record limits. No DB edits/restart/dependencies.

### Metrics phase errors
- Combined long output truncated skill middle; re-read missing sections in bounded slices. Optional SUMCO silicon detail URL inaccessible; use primary product list/specification sources without guessing facts.
- First standalone packing check returned5/21 rather than intended9/21: four small-circle corner sites crossed the assumed margin by a small amount. Adjusted hypothetical pitch from.44to.43; keep complete-corner containment, fixed site size and1.5radius ratio, then independently verify counts.
- First browser metric assertion counted the cyan observation cursor as a fourth PPA card because it shares the.12height; exclude the explicit annotation colour when selecting category cards. Three equal cards and no ranking assertion retained.
- Projection patch contained an unnecessary unmatched process.js hunk; apply_patch rejected it without modifying files, verified by rg. Removed that hunk and applied only intended player/test changes.

## Concept-metric outcome
Three five-step concept lessons delivered;16total/9fabrication. Final post-orthographic teaching regression exited0 at1440/390/320 with actual pixels/motion, fixed-size all-corner packing9/21, fixed20classification18/2, dot/cross non-colour cues, readout/scrub consistency, equal conceptual PPA cards, concept-specific labels, controls/keyboard/reduced-motion/hidden/context-loss/no-script fallback. Actual WebGL uniforms confirm only concept scenes are orthographic and older process views remain perspective. Final desktop and mobile captures inspected.

Original query regression ran serially and exited0, zero JS exceptions. Independent post-run8industry/source tables and db_meta match before-metrics snapshot; integrity ok/version5. Original query assets, learning CSS and independent lithography HTML untouched. Shared player changes limited to optional readout and conditional concept camera; no dependency, restart, migration or source edit. Service PID25476 on8787. Preview open request queued, not claimed visible. Verification completed2026-10-02 after phase began2026-10-01.

Remaining: holistic novice reading-path review, terminology/transition consistency and alternative material/product routes; no claim every knowledge point is animated. /learn.html remains teaching preview and / remains original reference tool.

### Phase 19: Audit novice reading path
Status: complete
- Verified current service PID25476 and preserved before-reading-path-20261002 snapshot. Found stale eleven-demo coverage, inconsistent chapter navigation and explanations appearing after first-use summaries.
### Phase 20: Repair reading continuity
Status: complete
- Add an explicit seven-chapter start, foundational inline explanations and static previous/next navigation. Return fabrication demonstrations to the exact reading subsection, with a pre-reading entry before playback.
- No renderer, manufacturing geometry, original query assets or data changes; no account/progress/quiz or new framework.
### Phase 21: Verify reading path and regressions
Status: complete
- Actually click chapter1 through7 at1440/390/320, follow and return from demonstrations, validate anchors and no-script navigation; retain all16lesson gates. Run original-query suite serially and compare8tables+db_meta to fresh snapshot.

### Reading-path implementation errors
- A partial-line HTML patch was rejected because actual HTML uses long lines. A generated diff then included an empty trailing CSS hunk and was rejected atomically. Switched to exact whole-line hunks, preserved unchanged source lines and successfully applied bounded changes. No renderer edits.

## Reading-path outcome
First-chapter homepage entry, consistent7chapter native navigation, contextual foundational explanations and exact subsection pre-reading/return links delivered. Final teaching suite exited0 at1440/390/320, actual forward/backward chapter clicks, all16lesson return/expansion and existing geometry/pixels/controls/fallback gates passed. Original-query suite ran serially and exited0. Reports both passed; static IDs unique. Desktop/mobile homepage and final chapter navigation captures reviewed after replacing an empty long-document crop with a viewport capture.

Independent8industry/source tables plus db_meta match before-reading-path-20261002 snapshot; integrity ok. Original index/app/styles, shared3Dplayer and all process geometry unchanged. No dependency, account, quiz, restart or data migration. Listener127.0.0.1:8787 PID25476 unchanged. Remaining: alternative product/material-route explanations and further content coverage; preview still independent from original query homepage.

### Phase 25: Restore scope and verify diagram evidence
Status: complete
- Preserve before-structure-diagrams-20261002 snapshot; verify primary sources for five bounded structural illustrations. Separate functional diagrams from sections and die-internal layers from assembled dies.
### Phase 26: Add accessible native structural figures
Status: complete
- Add five inline SVG figures for GaN/substrate, DRAM cell roles, 3D NAND, representative 2.5D and stacked-die packaging. Adjacent text, explicit omissions, no physical-scale or animation claims. Scoped styles only; retain seven chapters/nine operations/16 demonstrations.
### Phase 27: Verify visual and regression gates
Status: complete
- Check meaningful SVG titles/descriptions, unique references, text fit and responsive/no-script reading at1440/390/320. Inspect screenshots; run teaching and original-query suites serially; compare fresh DB and unchanged query/player assets.

### Structure-diagram execution errors
- Default shell launch failed with helper_unknown_error before command execution; scoped escalated read succeeded. Long combined page output truncated; reread missing product/package and test portions in bounded output.

## Foundational-circuit continuation
### Phase 28: Verify foundational circuit bridge
Status: complete
- Restore first-chapter content and verify primary transistor/digital-logic explanations. Preserve before-circuit-basics-20261002 snapshot. Explain signal versus power, controllable current path, logical0/1 and transistor-to-circuit relation without formulas or device recipes.
### Phase 29: Add bounded native reading content
Status: complete
- Add first-chapter circuit-basics section with native optional explanations, one functional figure and a two-row inverter example. Reuse existing static figure styling and seven-chapter structure; contextual links only. No new3D lesson/player or quiz.
### Phase 30: Verify beginner reading and regression
Status: complete
- Extend actual entry/disclosure/cross-reading, accessible figure fit, logic example, no-script and responsive checks. Preserve five previous figures and16animations; run teaching/query suites serially and compare fresh DB/assets.

### Circuit-basics execution notes
- Combined skill/page output exceeded output budget; reread truncated skill ending. No source edits before skill reading completed.
- Second full teaching run passed all width/content/figure/lesson loops but timed out during pre-existing reduced-motion→replay check for cleaning (line374). Captured DOMStringMap serialized as {} (not evidence of absent attributes); controls paused/enabled and errors empty. First run passed. Shared player's asynchronous media-change handler stops playback and updates UI; test clicked replay immediately after emulation change without awaiting UI restoration. Added explicit enabled/non-reduced status readiness before replay, retaining the original playing=true assertion and timeout. Production renderer untouched; full rerun required.

## Foundational-circuit outcome
First chapter now bridges signal/power, representative transistor control, logical levels/bits and circuit combinations with three native disclosures, one accessible functional figure and a conditional two-row inverter example. Home entry and manufacturing prerequisite cross-reading added. No formulas, quiz, new3D lesson, dependency or comprehensive device-physics claim.

Final teaching suite exited0 at1440/390/320, including new entry/keyboard/content/table/reading/no-script checks, six accessible fit-checked figures, previous16lesson geometry/pixels/controls/contextloss/reduced-motion gates and restored cleaning replay. One asynchronous test synchronization issue diagnosed/logged; added UI-readiness wait without changing production player or reducing assertions/timeouts. Original-query suite ran serially and exited0, zero JS exceptions; both final reports passed. Desktop/320px new figure and table screenshots inspected. Eight industry/source tables plus db_meta equal fresh before-circuit-basics-20261002 snapshot, integrity ok/209records. Previous five figures identical; query and all process/lithography assets untouched. Public edits only chapters.html/learn.html/learning.css. Listener127.0.0.1:8787 PID25476; no restart/migration. Preview open returned queued, not claimed visible. Remaining deeper topics and transistor-animation coverage are separate future stages.

## Structural-figure outcome
Five original static inline illustrations delivered in chapters4/5/6, each with accessible title/description and explicit adjacent simplification text. Kept seven chapters/nine fabrication operations/16demonstrations; no new player/dependency or whole-product animation claim. Desktop screenshots and320/390px reading captures inspected. Scoped route-grid top alignment prevents stretched text-only cards.

Final teaching suite exited0 at1440/390/320 with figure accessibility/unique IDs/components/label bounds/no overlap/minimum rendered font/no-script checks, exact reading links and all original16lesson geometry/pixels/controls/fallback gates. Original-query suite ran serially and exited0, zero JS exceptions. Both final reports passed. Eight industry/source tables plus db_meta equal fresh backup; integrity ok,209records. Public edits limited to chapters.html/learning.css; homepage/query/process/lithography assets unchanged. Service127.0.0.1:8787 PID25476 unchanged, no restart or DB migration. Browser preview request queued; not claimed visible. Remaining deeper coverage/selected alternative-route animations still separate future work.

### Phase 22: Verify alternative-route scope and sources
Status: complete
- Review current chapters and primary technical explanations for logic/DRAM/NAND/power devices, silicon/SiC/GaN substrates and packaging choices. Explain shared operations versus differing structure/tasks, not recipes or ranking.
- Preserve a fresh snapshot before editing; keep seven chapters and16existing demonstrations.
### Phase 23: Add bounded novice route comparisons
Status: complete
- Add static purpose/structure/manufacturing comparisons in chapter5, material-route explanation in chapter4 and package connection/placement/wafer-level distinctions in chapter6. Link from relevant chapter2/home entries.
- Reuse native cards/details/anchors. No new framework, geometry, player, original query, source DB or production restart.
### Phase 24: Verify content and reading regressions
Status: complete
- Extend browser checks for comparison contents, nearby source links, native disclosure, route cross-links and no-script/mobile reading at1440/390/320. Preserve full16lesson and nine-operation gates; run original query serially and compare fresh snapshot data/assets.

### Product-route errors
- Initial no-op findings patch used an incorrect heading and was rejected; used the verified reading-path heading for additions.
- Generated homepage patch selected the earlier chapter5 quick-start button instead of the curriculum row, causing out-of-order context rejection. No partial change; restricted selection to the actual li rows and applied successfully.
- One Amkor fan-out URL unavailable; new text cites verified WLP/WLCSP pages and does not infer an unverified fan-out workflow. Combined long skill/page output truncated; reread missing skill sections in bounded slices.

## Product-route outcome
Three bounded static comparison sections delivered in chapters4/5/6, with homepage/chapter2/cross-reading entry links. Four representative product cards, three material/substrate cards, four package connection/placement examples and native WLP/WLCSP disclosure. Existing7chapters/9fabrication operations/16animations retained. No alternative route animation claimed.

Final teaching suite exited0 at1440/390/320 with new actual entry clicks, product/material/package scope checks, adjacent sources, native keyboard disclosure, responsive layout and cross-reading/no-script gates plus all existing16lesson geometry/pixels/control/fallback checks. Original query suite ran serially and exited0, zero JS exceptions; both reports passed. Desktop and narrow-screen captures inspected. Eight industry/source tables and db_meta match fresh backup, integrity ok;209records retained. Original query assets, all3Dpages/scripts/scenes and learning.css byte-identical. Only two public HTML files changed, no dependency/DB mutation/restart. Listener127.0.0.1:8787 PID25476. Remaining: selected alternative-route structural illustrations and deeper topic coverage, not a fully animated all-product curriculum.


## Direct-reading layout revision
### Phase 31: Restore scope and preserve current state
Status: complete
- User supplied two changes: remove all learning disclosures and make reading layout logical. Third suggestion not supplied; proceed with two.
- Snapshot before-open-reading-20261002 created; SQLite integrity ok, listener PID25476 at127.0.0.1:8787.
### Phase 32: Convert to visible semantic content and ordered reading layout
Status: complete
- Four learning pages: static headings/articles, visible curriculum and definitions, consistent chapter column with desktop directory. Preserve text, sources, IDs, six figures and16 animations; no query/player/data changes.
### Phase 33: Verify open reading, visual layout and regressions
Status: complete
- Replace obsolete disclosure assertions with direct visibility and semantic/keyboard navigation checks; retain all content/geometry/control/fallback gates. Desktop/mobile screenshots and original-query suite serially; independent snapshot comparisons.

## Direct-reading outcome
All four learning pages have no details/summary controls. Definitions, seven visible curriculum cards and complete explanations/transcripts show immediately. Chapter content reads in one column with consistent h2/h3/h4 hierarchy, desktop sticky directory and mobile static directory; IDs and navigation retained.
Final teaching suite exited0 at1440/390/320: open reading, keyboard navigation, six accessible figures,16 animations, pixels/geometry/control/reduced-motion/no-script and no-overflow gates passed. Actual desktop/narrow screenshots inspected. Original-query suite ran serially and exited0, zero JS exceptions,209 records. Fresh-snapshot independent comparison preserved every former disclosure paragraph, ID and SVG; all original public JS/query files and10 actual SQLite tables identical, integrity ok. Listener PID25476 unchanged; no restart or migration.


## Flow-first learning entry
### Phase 34: Restore scope and preserve state
Status: complete
- User wants manufacturing overview on entry, then each process's detail; existing homepage privileges one lithography sample over full flow.
- Fresh before-flow-home-20261002 snapshot and SQLite integrity ok. Current served learn page is latest direct-reading version; screenshot contains older optional-reading copy.
- Revise /learn.html (shown learning homepage); keep original / query independent, no route cutover or restart.
### Phase 35: Implement map-first entry and process details
Status: complete
- Compact introductory header, preparation inputs, bounded recurring fabrication tasks/control and downstream test/package map first. All nodes link to focused details reusing canonical chapter content.
- Remove singled-out lithography hero/callout; retain full existing learning content below and16 animations; no new technical recipes, renderer or framework.
### Phase 36: Verify map navigation, content and regressions
Status: complete
- Test first-viewport flow visibility, thirteen node/detail/source/animation links, keyboard/back/no-script/error fallback and widths1440/768/390/320; inspect actual screenshots. Retain full teaching/query suites serially and fresh snapshot data/assets comparisons.

## Flow-first outcome
/learn.html now opens on a compact complete manufacturing relationship overview;13 nodes enter focused step details and existing animation links. Source text reused from canonical chapters; all previous IDs/paragraphs/6figures and16demonstrations preserved. Single lithography hero/callout removed, basic reading remains below. Root/query route retained pending optional default-entry preference.
Final full teaching suite exited0 at1440/390/320 plus768 tablet, including900px desktop map bound, actual13 keyboard/detail/source/content/return loops, focused package scope, unknown/fetch-error/no-script fallbacks and all prior player geometry/pixels/control/reduced-motion gates. Last18px detail spacing separately checked at1440/390/320 with final screenshots. Original-query suite ran serially and exited0; both reports passed with zero JS exceptions. Independent fresh comparison: original JS/query assets unchanged; chapter paragraphs and original home/chapter SVGs/IDs retained; nine non-log tables equal/209 records/integrity ok. Existing query log prefix retained; QA causes normal append-only query logs. Listener PID25476 unchanged, no restart or migration. Final map/mobile/focused detail screenshots reviewed.


## Equipment mechanism focus — 2026-10-02
37. COMPLETE: restored context; before-equipment-focus-20261002 snapshot includes integrity-checked SQLite backup. App is not a Git repository.
38. COMPLETE: remove five non-equipment animations, preserve static knowledge/figures/flow nodes and exact retired reading links; focus eleven retained demonstrations on internal mechanisms/material changes.
39. COMPLETE: syntax, responsive browser/retired routes, retained geometry/playback/fallback, original-query regression, independent snapshot/data comparison, screenshot review.

Equipment-focus outcome: eleven retained demonstrations and five retired reading routes passed final teaching suite; original-query suite passed serially. Actual served assets equal current disk versions. Seven chapters/thirteen flow details/six SVGs retained. Original query assets and nine business tables unchanged; query-log prefix preserved with normal QA appends. PID25476 remains listening, no restart/dependency/database migration. Backup before-equipment-focus-20261002 is recoverable.


## Three-part directory — 2026-10-02
40. COMPLETE: restore latest scope and create before-directory-streamline-20261002 snapshot; backup SQLite integrity ok.
41. COMPLETE: only three ordered homepage sections: semiconductor/chip/wafer distinction, company types, preparation/manufacturing overview; remove chapter directory, large decorative figure, repeated relationship overview and coverage block. Preserve all thirteen flow links, full chapters and eleven equipment lessons.
42. COMPLETE: verify section order, no orphan links, legacy directory anchor, all detail learning/return routes, responsive screenshots; retain full teaching/query regressions and compare unchanged content/assets/database.
Errors: default exec helper_unknown_error -> scoped escalation; first SQLite backup command failed PowerShell quoting -> here-string Node script, no original DB mutation. App remains non-Git repository.

Three-part directory outcome: only concepts, company roles and process map, in requested order. Final teaching and serial original-query reports passed/zero JS errors; final exact section screenshots reviewed.13flow nodes still enter complete canonical details and return;7chapters/6static chapter figures/11equipment lessons unchanged. Actual served files equal disk. Nine business tables equal fresh snapshot, existing query-log prefix retained, live+backup integrity ok. No restart/dependency/migration/commit, listenerPID25476 retained. Removed homepage modules recoverable in before-directory-streamline-20261002; preview request queued only.


## Wafer transfer and automation — 2026-10-02
43. COMPLETE: identify8787 live app/data path and current content, create before-transfer-automation-20261002 snapshot.
44. COMPLETE: add cross-process transfer/automation node and canonical novice explanation, with equipment interfaces, wafer state and checked primary sources; keep3part entry and existing11animations.
45. COMPLETE:14-node actual entry/return, native anchors/no-script/error paths, revised reading counts and responsive screenshots; run full teaching/query suites serially; compare existing content/figures/data and served version.
46. COMPLETE: user explicitly identified old8787query console. Retirement implemented under .planning/retire-query-console; old-only pages/data/backend/seeds removed recoverably to external offline archive. Teaching root retained; no Fab/app/Everything root deletion. Final teaching acceptance tracked in retirement plan.
