import TerraformHero from '../components/terraform/TerraformHero';
import CodeEditor from '../components/terraform/CodeEditor';
import InfraDiagram from '../components/terraform/InfraDiagram';
import TerraformSkills from '../components/terraform/TerraformSkills';
import TerraformWorkflow from '../components/terraform/TerraformWorkflow';

export default function TerraformPage() {
  return (
    <>
      <TerraformHero />
      <CodeEditor />
      <InfraDiagram />
      <TerraformSkills />
      <TerraformWorkflow />
    </>
  );
}
