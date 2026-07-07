
import Link from 'next/link';
import * as styles from './Footer.styles';
import * as constants from './Footer.constants';
import { useFooter } from './useFooter';
import { FooterSectionProps } from './Footer.types';

export default function FooterSection({}: FooterSectionProps) {
  const { currentYear } = useFooter();

  return (
    <div className={styles.wrapper}>
      {/* TOP: Olive/Sage Green Level */}
      <div className={styles.topSection}>
        <div className={styles.topContainer}>
          <div className={styles.topCard}>
            <h2 className={styles.topTitle}>
              {constants.TAGLINE}
            </h2>
            <p className={styles.topText}>
              {constants.DESCRIPTION}
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM: Dark Forest Green Level */}
      <div className={styles.bottomSection}>
        <div className={styles.bottomContainer}>
          <div>
            <h3 className={styles.footerHeading}>
              {constants.COMPANY_NAME}
            </h3>
            <p className={styles.footerText}>© {currentYear} All rights reserved</p>
          </div>
          
          <div>
            <h4 className={styles.footerSubHeading}>Legal</h4>
            <p className={styles.footerText}>
              {constants.LEGAL_TEXT}
            </p>
            <p className={`${styles.footerText} mt-2`}>
              Partners: <span className="text-[#dee2b1] font-medium">{constants.PARTNERS}</span>
            </p>
          </div>

          <div>
            <h4 className={styles.footerSubHeading}>Contact</h4>
            <p className={styles.footerText}>{constants.CONTACT.email}</p>
            <p className={styles.footerText}>{constants.CONTACT.phone}</p>
            <p className={styles.footerText}>{constants.CONTACT.address}</p>
          </div>

          <div>
            <h4 className={styles.footerSubHeading}>Social</h4>
            <div className={styles.socialWrapper}>
              {constants.SOCIALS.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href} 
                  className={styles.footerLink}
                >
                  {social.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}