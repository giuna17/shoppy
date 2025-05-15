
import { Label as ShadcnLabel } from "@/components/ui/label";
import React from 'react';

interface LabelProps extends React.ComponentPropsWithoutRef<typeof ShadcnLabel> {
  htmlFor?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return <ShadcnLabel ref={ref} className={className} {...props} />;
});

Label.displayName = 'Label';

export { Label };
export default Label;
