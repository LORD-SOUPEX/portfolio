import { useState, useEffect, useRef } from 'react';
import styles from './terraform.module.css';

const hclLines = [
  { c: 'keyword', t: 'resource' }, { c: 'type', t: '"aws_instance"' }, { c: 'string', t: '"web"' }, { c: 'bracket', t: '{' },
  { c: 'prop', t: '  ami' }, { c: 'equal', t: '=' }, { c: 'string', t: '"ami-0c55b159cbfafe1f0"' },
  { c: 'prop', t: '  instance_type' }, { c: 'equal', t: '=' }, { c: 'string', t: '"t2.micro"' },
  { c: 'empty', t: '' },
  { c: 'prop', t: '  tags' }, { c: 'equal', t: '=' }, { c: 'bracket', t: '{' },
  { c: 'prop', t: '    Name' }, { c: 'equal', t: '=' }, { c: 'string', t: '"Terraform-Demo"' },
  { c: 'bracket', t: '  }' },
  { c: 'bracket', t: '}' }
];

const terminalOutput = [
  { t: '$ terraform plan', c: 'prompt' },
  { t: 'Plan: 2 to add, 0 to change, 0 to destroy.', c: 'info' },
  { t: '$ terraform apply -auto-approve', c: 'prompt' },
  { t: 'aws_instance.web: Creating...', c: 'text' },
  { t: 'aws_instance.web: Creation complete after 10s', c: 'success' },
  { t: 'Apply complete! Resources: 2 added.', c: 'success' }
];

export default function CodeEditor() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [logs, setLogs] = useState([]);
  const sectionRef = useRef(null);
  const isStarted = useRef(false);

  useEffect(() => {
    const activeIntervals = [];
    const activeTimeouts = [];

    const addInterval = (fn, delay) => {
      const id = setInterval(fn, delay);
      activeIntervals.push(id);
      return id;
    };

    const addTimeout = (fn, delay) => {
      const id = setTimeout(fn, delay);
      activeTimeouts.push(id);
      return id;
    };

    const typeLogs = () => {
      let idx = 0;
      const logInterval = addInterval(() => {
        if (idx < terminalOutput.length) {
          const newLog = terminalOutput[idx];
          if (newLog) {
            setLogs(prev => [...prev, newLog]);
          }
          idx++;
        } else {
          clearInterval(logInterval);
        }
      }, 500);
    };

    const typeCode = () => {
      let idx = 0;
      const codeInterval = addInterval(() => {
        if (idx < hclLines.length) {
          const newLine = hclLines[idx];
          if (newLine) {
            setVisibleLines(prev => [...prev, newLine]);
          }
          idx++;
        } else {
          clearInterval(codeInterval);
          addTimeout(typeLogs, 1000);
        }
      }, 100);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting && !isStarted.current) {
        isStarted.current = true;
        typeCode();
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      activeIntervals.forEach(clearInterval);
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
              <div className={styles.filename}>main.tf</div>
            </div>
            <div className={styles.editorBody}>
              {visibleLines.map((line, i) => (
                <div key={i} className={`${styles.line || ''} ${styles[line.c] || ''}`}>
                  <span className={styles.lineNum || ''}>{i + 1}</span>
                  <span className={styles.lineContent || ''}>{line.t}</span>
                </div>
              ))}
              <div className={styles.cursor || ''}></div>
            </div>
          </div>

          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>Terminal Output</div>
            <div className={styles.terminalBody}>
              {logs.map((log, i) => (
                <div key={i} className={`${styles.termLine || ''} ${styles[log.c] || ''}`}>{log.t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
