import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Footer() {
  return (
<footer className="px-8 py-12 backdrop-blur-lg border-2 shadow-md dark:border-white border-black">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        
        {/* Left Section - Testimonial & Copyright */}
        <div className="flex flex-col justify-end items-center md:items-start gap-5 min-h-[200px]">
          <div className="text-primary p-4 rounded-lg shadow-lg max-w-sm border-2 border-[#f56551]">
            <p className="text-lg italic">
            "It does not matter how slowly you go as long as you do not stop."
            </p>
            <span className="text-sm text-gray-600 dark:text-gray-400">— Confucius </span>
          </div>
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} Alay Patel. All rights reserved.
          </p>
        </div>

        {/* Middle Section - FAQ */}
        <div className="flex flex-col items-center max-h-[250px] overflow-y-auto scrollbar-hide">
          <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is the AI Trip Planner free to use?</AccordionTrigger>
              <AccordionContent>
                Yes! Basic trip planning features are free. However, premium features like detailed local guides and exclusive deals may be available as paid options.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Does it work for international travel?</AccordionTrigger>
              <AccordionContent>
                Absolutely! The AI Trip Planner supports destinations worldwide and can recommend international flights, stays, and activities.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I use the planner offline?</AccordionTrigger>
              <AccordionContent>
                Currently, the AI Trip Planner requires an internet connection to generate and update itineraries. However, you can save your plans for offline access.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Who do I contact for support?</AccordionTrigger>
              <AccordionContent>
                If you need help, you can reach out through the support section in the app or email us at <a href="mailto:patelalay02@gmail.com" className="underline">patelalay02@gmail.com</a>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
