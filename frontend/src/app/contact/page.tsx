import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Contact the SV Blogger team</h1>
      <p className="mt-3 text-muted-foreground">
        Reach out for support, partnerships, or product feedback.
      </p>
      <form className="mt-10 space-y-4">
        <Input placeholder="Full name" />
        <Input placeholder="Email address" type="email" />
        <Textarea placeholder="Tell us what you need" />
        <Button type="submit">Send message</Button>
      </form>
    </section>
  );
}
