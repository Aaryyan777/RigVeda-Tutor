import RigvedaNav from '@/components/RigvedaNav';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Github, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <RigvedaNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
            Contact
          </h1>
          <p className="text-muted-foreground mb-8">
            Get in touch with us for questions, feedback, or collaboration opportunities
          </p>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-saffron)]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[var(--vedic-saffron)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      For general inquiries, feedback, or bug reports
                    </p>
                    <a 
                      href="mailto:contact@rigveda-online.org" 
                      className="text-[var(--vedic-saffron)] hover:underline"
                    >
                      contact@rigveda-online.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-gold)]/10 flex items-center justify-center flex-shrink-0">
                    <Github className="w-6 h-6 text-[var(--vedic-gold)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">GitHub</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      View source code, report issues, or contribute to the project
                    </p>
                    <a 
                      href="https://github.com/rigveda-online" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--vedic-saffron)] hover:underline"
                    >
                      github.com/rigveda-online
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--vedic-amber)]/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-[var(--vedic-amber)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Data Sources</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      For questions about the underlying data and APIs
                    </p>
                    <div className="space-y-1">
                      <a 
                        href="https://vedaweb.uni-koeln.de" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-[var(--vedic-saffron)] hover:underline"
                      >
                        VedaWeb Digital Corpus
                      </a>
                      <a 
                        href="https://www.learnsanskrit.cc" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-[var(--vedic-saffron)] hover:underline"
                      >
                        Learn Sanskrit Dictionary
                      </a>
                      <a 
                        href="https://github.com/aasi-archive/rv-audio" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-[var(--vedic-saffron)] hover:underline"
                      >
                        AASI Audio Archive
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Acknowledgments</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This project would not be possible without the incredible work of scholars and institutions
                  who have digitized and made the Rigveda accessible to the world:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>VedaWeb team at the University of Cologne for their comprehensive digital corpus</li>
                  <li>Learn Sanskrit project for making Sanskrit accessible to modern learners</li>
                  <li>AASI Archive for preserving and sharing traditional recitations</li>
                  <li>All the translators and scholars whose public domain work enables this platform</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[var(--vedic-saffron)]/20 bg-[var(--vedic-saffron)]/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Contributing</h3>
                <p className="text-sm text-muted-foreground">
                  Rigveda Online is an open-source project built for the Rig Veda Hackathon.
                  We welcome contributions from developers, scholars, and enthusiasts.
                  Whether it's code improvements, data corrections, or feature suggestions,
                  your input helps make this resource better for everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}