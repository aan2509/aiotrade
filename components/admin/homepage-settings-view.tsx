import {
  updateBenefitsSectionAction,
  updateBlogSectionAction,
  updateFaqSectionAction,
  updateFooterSectionAction,
  updateGuideSectionAction,
  updateHeroSectionAction,
  updateOverviewSectionAction,
  updatePricingSectionAction,
} from "@/app/(protected)/admin/actions";
import type { HomepageContent } from "@/components/landing/types";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type HomepageSettingsViewProps = {
  content: HomepageContent;
  status?: string;
  section?: string;
};

type FieldProps = {
  defaultValue: string;
  label: string;
  name: string;
  rows?: number;
};

function TextField({ defaultValue, label, name }: FieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input defaultValue={defaultValue} id={name} name={name} />
    </div>
  );
}

function TextAreaField({ defaultValue, label, name, rows = 4 }: FieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <textarea
        className="min-h-28 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
        defaultValue={defaultValue}
        id={name}
        name={name}
        rows={rows}
      />
    </div>
  );
}

function SectionAlert({
  currentSection,
  label,
  section,
  status,
}: {
  currentSection?: string;
  label: string;
  section: string;
  status?: string;
}) {
  if (currentSection !== section || !status) {
    return null;
  }

  return status === "saved" ? (
    <Alert variant="success">{label} berhasil diperbarui.</Alert>
  ) : (
    <Alert variant="error">Ada data {label.toLowerCase()} yang belum valid. Cek lagi inputnya.</Alert>
  );
}

export function HomepageSettingsView({
  content,
  section,
  status,
}: HomepageSettingsViewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Homepage Content Manager</CardTitle>
          <CardDescription>
            Perubahan di sini akan langsung memengaruhi homepage utama (`/`) dan landing page referral
            (`/:username`).
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="scroll-mt-24" id="hero-section">
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Atur copy utama dan label tombol di bagian hero.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SectionAlert currentSection={section} label="Hero section" section="hero" status={status} />
          <form action={updateHeroSectionAction} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField defaultValue={content.hero.eyebrow} label="Eyebrow" name="eyebrow" />
              <TextField defaultValue={content.hero.ctaLabel} label="Label Tombol" name="ctaLabel" />
              <TextField defaultValue={content.hero.titleBlue} label="Title Biru" name="titleBlue" />
              <TextField defaultValue={content.hero.titleWhite} label="Title Putih" name="titleWhite" />
            </div>
            <TextAreaField defaultValue={content.hero.subtitle} label="Subtitle" name="subtitle" rows={3} />
            <Button type="submit">Simpan Hero Section</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="scroll-mt-24" id="overview-section">
        <CardHeader>
          <CardTitle>Overview Section</CardTitle>
          <CardDescription>Atur headline overview, deskripsi, dan CTA utama section ini.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SectionAlert currentSection={section} label="Overview section" section="overview" status={status} />
          <form action={updateOverviewSectionAction} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField defaultValue={content.overview.titleBlue} label="Title Biru" name="titleBlue" />
              <TextField defaultValue={content.overview.titleWhite} label="Title Putih" name="titleWhite" />
            </div>
            <TextAreaField
              defaultValue={content.overview.description}
              label="Deskripsi"
              name="description"
              rows={5}
            />
            <TextField defaultValue={content.overview.ctaLabel} label="Label Tombol" name="ctaLabel" />
            <Button type="submit">Simpan Overview Section</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="scroll-mt-24" id="benefits-section">
        <CardHeader>
          <CardTitle>Benefit Section</CardTitle>
          <CardDescription>Atur heading dan isi kartu manfaat.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SectionAlert currentSection={section} label="Benefit section" section="benefits" status={status} />
          <form action={updateBenefitsSectionAction} className="space-y-5">
            <input name="itemCount" type="hidden" value={content.benefits.items.length} />
            <TextField defaultValue={content.benefits.heading} label="Heading" name="heading" />
            <TextAreaField
              defaultValue={content.benefits.description}
              label="Subheading"
              name="description"
              rows={3}
            />
            <div className="space-y-4">
              {content.benefits.items.map((item, index) => (
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4" key={`${item.title}-${index}`}>
                  <p className="text-sm font-semibold text-stone-900">Benefit Card {index + 1}</p>
                  <div className="mt-3 grid gap-4">
                    <TextField
                      defaultValue={item.title}
                      label="Judul"
                      name={`item-${index}-title`}
                    />
                    <TextAreaField
                      defaultValue={item.description}
                      label="Deskripsi"
                      name={`item-${index}-description`}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button type="submit">Simpan Benefit Section</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="scroll-mt-24" id="pricing-section">
        <CardHeader>
          <CardTitle>Pricing Section</CardTitle>
          <CardDescription>Atur judul harga, label tombol, dan isi semua paket.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SectionAlert currentSection={section} label="Pricing section" section="pricing" status={status} />
          <form action={updatePricingSectionAction} className="space-y-5">
            <input name="planCount" type="hidden" value={content.pricing.plans.length} />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField defaultValue={content.pricing.eyebrow} label="Eyebrow" name="eyebrow" />
              <TextField defaultValue={content.pricing.title} label="Judul" name="title" />
            </div>
            <TextField
              defaultValue={content.pricing.buttonLabel}
              label="Label Tombol"
              name="buttonLabel"
            />
            <div className="space-y-4">
              {content.pricing.plans.map((plan, index) => (
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4" key={`${plan.name}-${index}`}>
                  <input name={`plan-${index}-emphasis`} type="hidden" value={String(Boolean(plan.emphasis))} />
                  <p className="text-sm font-semibold text-stone-900">Plan {index + 1}</p>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    <TextField defaultValue={plan.name} label="Nama Plan" name={`plan-${index}-name`} />
                    <TextField defaultValue={plan.price} label="Harga" name={`plan-${index}-price`} />
                  </div>
                  <div className="mt-4 grid gap-4">
                    <TextField
                      defaultValue={plan.highlight ?? ""}
                      label="Badge Highlight"
                      name={`plan-${index}-highlight`}
                    />
                    <TextAreaField
                      defaultValue={plan.description}
                      label="Deskripsi"
                      name={`plan-${index}-description`}
                      rows={4}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button type="submit">Simpan Pricing Section</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="scroll-mt-24" id="faq-section">
        <CardHeader>
          <CardTitle>FAQ Section</CardTitle>
          <CardDescription>Atur judul FAQ dan daftar pertanyaan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SectionAlert currentSection={section} label="FAQ section" section="faq" status={status} />
          <form action={updateFaqSectionAction} className="space-y-5">
            <input name="itemCount" type="hidden" value={content.faq.items.length} />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField defaultValue={content.faq.title} label="Judul" name="title" />
              <TextField defaultValue={content.faq.subtitle} label="Subjudul" name="subtitle" />
            </div>
            <div className="space-y-4">
              {content.faq.items.map((item, index) => (
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4" key={`${item.question}-${index}`}>
                  <p className="text-sm font-semibold text-stone-900">FAQ Item {index + 1}</p>
                  <div className="mt-3 grid gap-4">
                    <TextField
                      defaultValue={item.question}
                      label="Pertanyaan"
                      name={`item-${index}-question`}
                    />
                    <TextAreaField
                      defaultValue={item.answer}
                      label="Jawaban"
                      name={`item-${index}-answer`}
                      rows={4}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button type="submit">Simpan FAQ Section</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="scroll-mt-24" id="guide-section">
        <CardHeader>
          <CardTitle>Guide Section</CardTitle>
          <CardDescription>Atur judul panduan dan isi tiap langkah.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SectionAlert currentSection={section} label="Guide section" section="guide" status={status} />
          <form action={updateGuideSectionAction} className="space-y-5">
            <input name="stepCount" type="hidden" value={content.guide.steps.length} />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField defaultValue={content.guide.eyebrow} label="Eyebrow" name="eyebrow" />
              <TextField defaultValue={content.guide.title} label="Judul" name="title" />
            </div>
            <TextField
              defaultValue={content.guide.buttonLabel}
              label="Label Tombol"
              name="buttonLabel"
            />
            <div className="space-y-4">
              {content.guide.steps.map((step, index) => (
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4" key={`${step.number}-${index}`}>
                  <p className="text-sm font-semibold text-stone-900">Langkah {index + 1}</p>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    <TextField defaultValue={step.number} label="Nomor" name={`step-${index}-number`} />
                    <TextField defaultValue={step.title} label="Judul" name={`step-${index}-title`} />
                  </div>
                  <div className="mt-4">
                    <TextAreaField
                      defaultValue={step.description}
                      label="Deskripsi"
                      name={`step-${index}-description`}
                      rows={4}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button type="submit">Simpan Guide Section</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="scroll-mt-24" id="blog-section">
        <CardHeader>
          <CardTitle>Blog Section</CardTitle>
          <CardDescription>Atur judul section dan isi kartu artikel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SectionAlert currentSection={section} label="Blog section" section="blog" status={status} />
          <form action={updateBlogSectionAction} className="space-y-5">
            <input name="itemCount" type="hidden" value={content.blog.items.length} />
            <TextField defaultValue={content.blog.title} label="Judul" name="title" />
            <div className="space-y-4">
              {content.blog.items.map((item, index) => (
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4" key={`${item.title}-${index}`}>
                  <p className="text-sm font-semibold text-stone-900">Artikel {index + 1}</p>
                  <div className="mt-3 grid gap-4">
                    <TextField defaultValue={item.title} label="Judul Artikel" name={`item-${index}-title`} />
                    <TextAreaField
                      defaultValue={item.description}
                      label="Deskripsi Pendek"
                      name={`item-${index}-description`}
                      rows={3}
                    />
                    <TextField defaultValue={item.label} label="Label Badge" name={`item-${index}-label`} />
                  </div>
                </div>
              ))}
            </div>
            <Button type="submit">Simpan Blog Section</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="scroll-mt-24" id="footer-section">
        <CardHeader>
          <CardTitle>Footer Section</CardTitle>
          <CardDescription>Atur deskripsi footer, copyright, dan daftar link panduan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SectionAlert currentSection={section} label="Footer section" section="footer" status={status} />
          <form action={updateFooterSectionAction} className="space-y-5">
            <input name="linkCount" type="hidden" value={content.footer.guideLinks.length} />
            <TextAreaField
              defaultValue={content.footer.description}
              label="Deskripsi Footer"
              name="description"
              rows={5}
            />
            <TextField
              defaultValue={content.footer.copyright}
              label="Copyright"
              name="copyright"
            />
            <div className="space-y-4">
              {content.footer.guideLinks.map((link, index) => (
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4" key={`${link.label}-${index}`}>
                  <p className="text-sm font-semibold text-stone-900">Footer Link {index + 1}</p>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    <TextField defaultValue={link.label} label="Label" name={`link-${index}-label`} />
                    <TextField defaultValue={link.href} label="Href" name={`link-${index}-href`} />
                  </div>
                </div>
              ))}
            </div>
            <Button type="submit">Simpan Footer Section</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
