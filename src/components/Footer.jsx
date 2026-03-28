import { Linkedin } from 'lucide-react';

function Footer() {
    return (
        <div className="mt-8 text-center">
            <p className="mb-2 text-sm text-gray-600">Connect with me:</p>
            <a
                href="https://linkedin.com/in/rushikesh-patil-"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors duration-200 hover:bg-blue-200"
            >
                <Linkedin className="h-4 w-4" />
            </a>
        </div>
    );
}

export default Footer;
