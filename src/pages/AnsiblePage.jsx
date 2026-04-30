import AnsibleHero from '../components/ansible/AnsibleHero';
import PlaybookEditor from '../components/ansible/PlaybookEditor';
import OrchestrationDiagram from '../components/ansible/OrchestrationDiagram';
import AnsibleSkills from '../components/ansible/AnsibleSkills';
import AnsibleWorkflow from '../components/ansible/AnsibleWorkflow';


export default function AnsiblePage() {
  return (
    <>
      <AnsibleHero />
      <PlaybookEditor />
      <OrchestrationDiagram />
      <AnsibleSkills />
      <AnsibleWorkflow />
    </>
  );
}
