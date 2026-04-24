---
description: "Use when creating or updating React component tests, Vitest component tests, RTL tests, or accessibility assertions for components. Read the accessibility persona collection and report persona coverage for the component in the final response."
applyTo: "@/components/**/*.test.tsx"
---

# Component Test Persona Guidance

Before you create or modify a component test file, read:

- `.github/accessibility-personas/persona-collection.json`
- `.github/accessibility-personas/persona-collection.schema.json`

Use the persona collection to decide which personas are relevant to the component being tested.

## Required workflow

1. Read the persona collection before editing the test.
2. Identify which personas are:

- primary: directly exercised by the component's behavior or layout
- secondary: relevant but only partially covered by the component or current test scope
- not applicable: not meaningfully exercised by this component

3. Add or update test assertions when a persona introduces a meaningful requirement that belongs in component-test scope.
4. In your final response, include a `Persona Coverage` section.

## Persona Coverage output format

Use one bullet per persona that you considered.

- `<persona-id> (firstName, lastName)` — `primary|secondary|not applicable`; explain which part of the component maps to the persona and whether the test now covers it, partially covers it, or intentionally does not cover it.

Keep each bullet concrete. Mention the interaction, layout, focus behavior, affordance, or accessibility assertion that drove the decision.

List the testing gaps where automated testing cannot be 100% substituted for manual testing from each considered persona's perspective.

## Scope guidance

- Prefer Pam for keyboard-only workflows, focus order, focus visibility, and key activation.
- Prefer Rob for pointer affordance, click targets, hover-only risk, and semantic clickability.
- Prefer Amira for mobile layout, touch targets, viewport resilience, and interruption-sensitive flows.

If a persona is relevant but should not be enforced at component-test level, say so explicitly and explain whether the gap belongs in E2E, visual, or manual testing instead.

Do not claim persona coverage without tying it to an actual assertion, an existing semantic guarantee, or an explicit out-of-scope rationale.
