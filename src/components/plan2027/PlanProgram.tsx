import { ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { plan2027 } from "@/data/plan2027";
import { nbsp } from "@/lib/nbsp";

export const PlanProgram = () => (
  <Tabs defaultValue="0" className="mt-8">
    <TabsList aria-label="Дни финансовой стратсессии" className="grid h-auto w-full grid-cols-5 gap-1 rounded-none bg-transparent p-0 md:gap-3">
      {plan2027.days.map((day, index) => (
        <TabsTrigger key={day.date} value={String(index)} className="h-full min-w-0 flex-col items-start gap-2 whitespace-normal rounded-md border border-border px-2 py-4 text-left data-[state=active]:bg-primary data-[state=active]:text-primary-foreground md:p-5">
          <span className="font-display text-2xl md:text-4xl">{day.date}</span><span className="text-xs">{day.month}</span><span className="text-xs md:text-sm">{day.kind}</span><span className="hidden text-sm md:block">{nbsp(day.name)}</span>
        </TabsTrigger>
      ))}
    </TabsList>
    {plan2027.days.map((day, index) => (
      <TabsContent key={day.date} value={String(index)} className="mt-6 border-y border-border py-7 md:min-h-[330px] md:py-10">
        <div className="grid gap-7 md:grid-cols-[1.6fr_1fr] md:gap-12">
          <div><p className="mb-4 text-sm text-muted-foreground">{nbsp(day.label)}</p><h3 className="text-2xl font-semibold md:text-3xl">{nbsp(day.title)}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{nbsp(day.description)}</p><ul className="mt-5 flex flex-wrap gap-2">{day.tags.map((tag) => <li key={tag} className="rounded-md bg-secondary px-3 py-2 text-sm">{nbsp(tag)}</li>)}</ul></div>
          <aside className="border-l-2 border-accent pl-6"><ArrowUpRight className="mb-5 size-8 text-accent" /><p className="text-sm text-muted-foreground">Результат дня</p><h4 className="mt-2 text-2xl font-semibold">{nbsp(day.result)}</h4><p className="mt-3 leading-relaxed text-muted-foreground">{nbsp(day.resultDescription)}</p></aside>
        </div>
      </TabsContent>
    ))}
  </Tabs>
);