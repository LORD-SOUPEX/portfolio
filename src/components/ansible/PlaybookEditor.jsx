import { useState, useEffect, useRef } from 'react';
import styles from './ansible.module.css';

const playbookLines = [
  { t: '- name: Setup Nginx Web Server', c: 'keyword' },
  { t: '  hosts: webservers', c: 'keyword' },
  { t: '  become: yes', c: 'keyword' },
  { t: '  tasks:', c: 'keyword' },
  { t: '    - name: Ensure Nginx is installed', c: 'comment' },
  { t: '      apt:', c: 'prop' },
  { t: '        name: nginx', c: 'string' },
  { t: '        state: present', c: 'string' },
  { t: '    - name: Start Nginx service', c: 'comment' },
  { t: '      service:', c: 'prop' },
  { t: '        name: nginx', c: 'string' },
  { t: '        state: started', c: 'string' }
];

const terminalLogs = [
  { t: '$ ansible-playbook setup_webserver.yml', c: '#8b949e' },
  { t: 'PLAY [Setup Nginx Web Server] ************************************', c: '#fff' },
  { t: 'TASK [Gathering Facts] *******************************************', c: '#fff' },
  { t: 'ok: [web1.brice.fr]', c: '#06b6d4' },
  { t: 'TASK [Ensure Nginx is installed] *********************************', c: '#fff' },
  { t: 'changed: [web1.brice.fr]', c: '#eab308' },
  { t: 'TASK [Start Nginx service] ***************************************', c: '#fff' },
  { t: 'ok: [web1.brice.fr]', c: '#06b6d4' },
  { t: 'PLAY RECAP *******************************************************', c: '#fff' },
  { t: 'web1.brice.fr : ok=3 changed=1 unreachable=0 failed=0', c: '#22c55e' }
];

export default function PlaybookEditor() {
  const [lines, setLines] = useState([]);
  const [logs, setLogs] = useState([]);
  const sectionRef = useRef(null);
  const isTyping = useRef(false);

  useEffect(() => {
    const activeTimeouts = [];

    const addTimeout = (fn, delay) => {
      const id = setTimeout(fn, delay);
      activeTimeouts.push(id);
      return id;
    };

    const startLogs = () => {
      let logIdx = 0;
      const typeLog = () => {
        if (logIdx < terminalLogs.length) {
          const newLog = terminalLogs[logIdx];
          if (newLog) {
            setLogs(prev => [...prev, newLog]);
          }
          logIdx++;
          addTimeout(typeLog, 400);
        }
      };
      typeLog();
    };

    const startTyping = () => {
      let lineIdx = 0;
      const typeLine = () => {
        if (lineIdx < playbookLines.length) {
          const newLine = playbookLines[lineIdx];
          if (newLine) {
            setLines(prev => [...prev, newLine]);
          }
          lineIdx++;
          addTimeout(typeLine, 100);
        } else {
          addTimeout(startLogs, 1000);
        }
      };
      typeLine();
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting && !isTyping.current) {
        isTyping.current = true;
        startTyping();
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      activeTimeouts.forEach(clearTimeout);
    };
  }, []);

  if (!styles) return null;

  return (
    <section ref={sectionRef} className="section">
      <div className="container">
        <div className={styles.editorGrid}>
          <div className={styles.editor}>
            <div className={styles.editorHeader}>
              <div className={styles.dots}><span></span><span></span><span></span></div>
              <div className={styles.filename}>setup_webserver.yml</div>
            </div>
            <div className={styles.editorBody}>
              {lines.map((line, i) => (
                <div key={i} className={`${styles.line || ''} ${styles[line.c] || ''}`}>{line.t}</div>
              ))}
              <div className={styles.cursor || ''}></div>
            </div>
          </div>

          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>Execution Terminal</div>
            <div className={styles.terminalBody}>
              {logs.map((log, i) => (
                <div key={i} style={{ color: log.c }}>{log.t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
