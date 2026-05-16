import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px'
    }}>
      <div style={{ maxWidth: '800px', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '4.5rem', 
          fontWeight: '900', 
          marginBottom: '1rem',
          background: 'linear-gradient(90deg, #00f5ff, #7209b7, #f72585)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Epic Tech AI Agent™️
        </h1>
        
        <p style={{ fontSize: '1.5rem', marginBottom: '3rem', opacity: 0.9 }}>
          Full production AI media generation platform
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px',
          marginBottom: '3rem'
        }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '32px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎨</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Image &amp; Video</h3>
            <p style={{ opacity: 0.8 }}>Generate stunning visuals and videos with Groq + Replicate</p>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '32px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎙️</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Audio &amp; Voice</h3>
            <p style={{ opacity: 0.8 }}>Text-to-speech, music, voice cloning and sound effects</p>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '32px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✍️</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Text &amp; Ideas</h3>
            <p style={{ opacity: 0.8 }}>Intelligent writing, ideation, and content generation</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#generate" style={{ 
            background: '#7209b7', 
            color: 'white', 
            padding: '16px 42px', 
            borderRadius: '9999px',
            fontWeight: '600',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'all 0.2s'
          }}>
            Start Generating Media
          </a>
          
          <a href="https://buy.stripe.com/fZudRad6V4LI592bzI0Fi0a" target="_blank" style={{ 
            background: 'transparent', 
            color: 'white', 
            padding: '16px 42px', 
            border: '2px solid rgba(255,255,255,0.4)',
            borderRadius: '9999px',
            fontWeight: '600',
            textDecoration: 'none',
            fontSize: '1.1rem'
          }}>
            Get Premium Access
          </a>
        </div>

        <p style={{ marginTop: '3rem', opacity: 0.6, fontSize: '0.95rem' }}>
          Powered by Groq • Next.js 15 • FastAPI • Stripe • Railway
        </p>
      </div>
    </div>
  );
}
