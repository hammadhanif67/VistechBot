import { Workflow, Asterisk, BarChart3, LockKeyhole } from "lucide-react";

const workflow = [
  [Workflow, "Easy Integration", "Connect in minutes"],
  [Asterisk, "Custom Workflows", "Tailored to your business"],
  [BarChart3, "Advanced Analytics", "Track what matters"],
  [LockKeyhole, "Enterprise Security", "Built-in data protection"],
];

export default function WorkflowStrip() {
  return (
    <section className="workflowRow" aria-label="Workflow highlights">
      {workflow.map(([Icon, title, desc], index) => (
        <article className="workflowItem" key={title} style={{ "--i": index }}>
          <span className="workflowIcon">
            <Icon size={22} strokeWidth={2.2} />
          </span>

          <div className="workflowText">
            <b>{title}</b>
            <span>{desc}</span>
          </div>
        </article>
      ))}
    </section>
  );
}