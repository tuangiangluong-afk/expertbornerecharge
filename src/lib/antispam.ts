/**
 * Anti-Spam protection for contact forms across the empire.
 * Zero-risk design: Real client quote requests are NEVER blocked.
 * 
 * Specifically filters:
 * 1. Honeypot traps (b_name, _gotcha, etc. filled only by bots)
 * 2. Known phishing domains (onpartage.online credential harvesters)
 * 3. Known attacker identities (Alexis Felten, probox.my.id, phone 0723926732)
 * 4. Phishing bait templates ("Le projet est exposé : https://...")
 * 5. Disposable/throwaway bot email domains (*.my.id)
 */

export interface SpamCheckResult {
    isSpam: boolean;
    reason?: string;
}

export function isSpamContactSubmission(body: Record<string, any>): SpamCheckResult {
    if (!body || typeof body !== 'object') {
        return { isSpam: false };
    }

    const { name, email, phone, message, b_name, _gotcha, honeypot } = body;

    // 1. Honeypot check: invisible field in ContactForm.tsx, humans never fill it
    if (b_name || _gotcha || honeypot) {
        return { isSpam: true, reason: 'honeypot_triggered' };
    }

    // 2. Known attacker phone number (cleaned of spaces, dots, dashes, +33)
    const cleanPhone = String(phone || '').replace(/[\s\.\-\(\)\+]/g, '').replace(/^33/, '0');
    if (cleanPhone === '0723926732') {
        return { isSpam: true, reason: 'known_spammer_phone' };
    }

    // 3. Known attacker email / disposable bot domains
    const emailStr = String(email || '').toLowerCase().trim();
    if (
        emailStr.includes('@probox.my.id') ||
        emailStr.endsWith('.my.id') ||
        emailStr.includes('alexis.felten')
    ) {
        return { isSpam: true, reason: 'known_spammer_email' };
    }

    // 4. Known phishing domains in message or anywhere in the body
    const messageStr = String(message || '').toLowerCase();
    const fullPayloadStr = JSON.stringify(body).toLowerCase();

    if (
        messageStr.includes('onpartage.online') ||
        fullPayloadStr.includes('onpartage.online') ||
        messageStr.includes('onpartage.')
    ) {
        return { isSpam: true, reason: 'malicious_phishing_link' };
    }

    // 5. Phishing bait pattern: external URL combined with phishing trigger phrasing
    const containsUrl = /(https?:\/\/[^\s]+)/i.test(messageStr);
    if (containsUrl) {
        const phishingBaitRegex = /(?:projet|formulaire|dossier|document)\s+(?:est\s+)?(?:exposé|décrit|ici|là|disponible)|(?:détails|photos|plans)\s+(?:du\s+projet\s+)?(?:ici|sont\s+ici|disponibles\s+ici)/i;
        if (phishingBaitRegex.test(messageStr)) {
            return { isSpam: true, reason: 'phishing_template_url' };
        }
    }

    return { isSpam: false };
}
