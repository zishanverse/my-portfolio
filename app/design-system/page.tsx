import { Button } from "@/components/ui/Button";

export default function DesignSystemPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-10 space-y-12">
            <section>
                <h1 className="text-4xl font-bold mb-6">Design System</h1>
                <p className="text-muted-foreground text-lg">
                    A showcase of the minimal dark-theme design scale.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b border-border pb-2">Colors & Contrast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background border border-border p-4 rounded-md">Background</div>
                    <div className="bg-card text-card-foreground p-4 rounded-md">Card</div>
                    <div className="bg-primary text-primary-foreground p-4 rounded-md">Primary</div>
                    <div className="bg-secondary text-secondary-foreground p-4 rounded-md">Secondary</div>
                    <div className="bg-accent text-accent-foreground p-4 rounded-md">Accent</div>
                    <div className="bg-muted text-muted-foreground p-4 rounded-md">Muted</div>
                    <div className="bg-destructive text-destructive-foreground p-4 rounded-md">Destructive</div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b border-border pb-2">Typography Scale</h2>
                <div className="space-y-4">
                    <h1>Heading 1: The quick brown fox</h1>
                    <h2>Heading 2: The quick brown fox</h2>
                    <h3>Heading 3: The quick brown fox</h3>
                    <p>Body: The quick brown fox jumps over the lazy dog. Simplicity is the ultimate sophistication.</p>
                    <p className="text-muted-foreground">Muted Body: The quick brown fox jumps over the lazy dog.</p>
                    <small>Small text: Copyright 2026</small>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b border-border pb-2">Buttons</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="default">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">Icon</Button>
                </div>
            </section>
        </div>
    );
}
