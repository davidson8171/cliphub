"use client";

import { Button } from "@/components/ui/button";
import { CornerRightDown } from "lucide-react";
import ViewPopup from "@/components/ui/viewPopup";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Reveal } from "@/components/animations/reveal";
import { Footer } from "@/components/ui/footer";
import { useToast } from "@/hooks/use-toast";
const FormSchema = z.object({
  name: z.string().min(1, { message: "Pflichtfeld" }),
  surname: z.string().min(1, { message: "Pflichtfeld" }),
  email: z.string().email({ message: "Keine gültige E-Mail" }),
  company: z.string(),
  message: z
    .string()
    .min(1, { message: "Pflichtfeld" })
    .max(1000, { message: "Maximal 1000 Zeichen" }),
});

const popupWidth = 200;
const popupHeight = 50;

export default function Home() {
  const [popups, setPopups] = useState<
    {
      id: number;
      top: string;
      left: string;
      viewCount: number;
      delay: number;
    }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const generateRandomPopups = () => {
    const newPopups: {
      id: number;
      top: string;
      left: string;
      viewCount: number;
      delay: number;
    }[] = [];

    const containerRect = containerRef.current?.getBoundingClientRect();
    const containerTop = containerRect?.top ?? 0;
    const containerLeft = containerRect?.left ?? 0;
    const containerBottom = containerRect?.bottom ?? window.innerHeight;
    const containerRight = containerRect?.right ?? window.innerWidth;

    const basePopupCount = 15;
    const popupCount = Math.max(
      5,
      Math.floor((window.innerWidth / 1920) * basePopupCount)
    );

    for (let i = 0; i < popupCount; i++) {
      let top: string;
      let left: string;

      let attempts = 0;
      const maxAttempts = 100;

      let popupTop;
      let popupLeft;
      let popupBottom;
      let popupRight;
      do {
        top = `${
          Math.random() * (100 - (popupHeight / window.innerHeight) * 100)
        }vh`;
        left = `${
          Math.random() * (100 - (popupWidth / window.innerWidth) * 100)
        }vw`;

        popupTop = (parseFloat(top) / 100) * window.innerHeight;
        popupLeft = (parseFloat(left) / 100) * window.innerWidth;
        popupBottom = popupTop + popupHeight;
        popupRight = popupLeft + popupWidth;

        attempts++;
      } while (
        attempts < maxAttempts &&
        popupBottom > containerTop &&
        popupTop < containerBottom &&
        popupRight > containerLeft &&
        popupLeft < containerRight
      );

      newPopups.push({
        id: i,
        top,
        left,
        viewCount: parseFloat((Math.random() * 998 + 1).toFixed(1)),
        delay: Math.random() * 1000,
      });
    }

    setPopups(newPopups);
  };

  useEffect(() => {
    generateRandomPopups();

    const interval = setInterval(() => {
      generateRandomPopups();
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    //console.log(data);
    //integrieren

    toast({ title: "Nachricht konnte nicht gesendet werden." });
  }

  function scrollToContact() {
    const target = contactRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <div className="h-screen bg-black flex justify-center">
        <div className="pt-60 w-full xl:w-6/12">
          <div className="flex flex-col items-center" ref={containerRef}>
            <Reveal>
              <h1 className="text-6xl font-bold tracking-tight z-30">
                CLIPHUB
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-muted-foreground leading-7 text-center mt-2">
                Verwandle deine Streams in virale Clips <br /> – Erreiche
                Millionen auf TikTok, YouTube & Co
              </p>
            </Reveal>
            <Reveal delay={0.7}>
              <Button className="w-max mt-8 z-30" onClick={scrollToContact}>
                Kontaktieren <CornerRightDown className="h-4 w-4 ml-2" />
              </Button>
            </Reveal>
          </div>

          {popups.map((popup) => (
            <ViewPopup
              key={popup.id}
              id={popup.id}
              viewCount={popup.viewCount}
              top={popup.top}
              left={popup.left}
              delay={popup.delay}
            />
          ))}
        </div>
      </div>
      <div
        className="bg-black min-h-screen flex justify-center"
        ref={contactRef}
      >
        <div className="pt-32 lg:pt-52 w-full xl:w-6/12 flex justify-center">
          <Reveal width="100%">
            <div className="flex justify-center">
              <Card className="w-10/12 md:max-w-[700px] bg-foreground border-none z-30">
                <CardHeader>
                  <CardTitle className="text-background">Kontakt</CardTitle>
                  <CardDescription className="text-muted">
                    * Pflichtfelder
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="grid md:grid-cols-2 items-center gap-4 gap-x-8">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="flex flex-col space-y-1.5">
                              <FormLabel
                                htmlFor="name"
                                className="text-background"
                              >
                                Vorname *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="name"
                                  className="bg-foreground text-background"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="surname"
                          render={({ field }) => (
                            <FormItem className="flex flex-col space-y-1.5">
                              <FormLabel
                                htmlFor="surname"
                                className="text-background"
                              >
                                Nachname *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="surname"
                                  className="bg-foreground text-background"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="flex flex-col space-y-1.5">
                              <FormLabel
                                htmlFor="email"
                                className="text-background"
                              >
                                E-Mail *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="email"
                                  className="bg-foreground text-background"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem className="flex flex-col space-y-1.5">
                              <FormLabel
                                htmlFor="company"
                                className="text-background"
                              >
                                Unternehmen
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id="company"
                                  className="bg-foreground text-background"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-600" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5 mt-4">
                            <FormLabel
                              htmlFor="message"
                              className="text-background"
                            >
                              Nachricht *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                id="message"
                                className="resize-none h-28 bg-foreground text-background"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-600" />
                          </FormItem>
                        )}
                      />
                      <div className="mt-4 flex justify-end">
                        <Button
                          type="submit"
                          className="bg-background text-foreground hover:bg-muted"
                        >
                          Abschicken
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
      <Footer />
    </main>
  );
}
