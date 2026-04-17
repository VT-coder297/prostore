// "use client"

// import * as React from "react"
// import { Menu as MenuPrimitive } from "@base-ui/react/menu"

// import { cn } from "@/lib/utils"
// import { ChevronRightIcon, CheckIcon } from "lucide-react"

// function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
//   return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
// }

// function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
//   return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
// }

// function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
//   return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
// }

// function DropdownMenuContent({
//   align = "start",
//   alignOffset = 0,
//   side = "bottom",
//   sideOffset = 4,
//   className,
//   ...props
// }: MenuPrimitive.Popup.Props &
//   Pick<
//     MenuPrimitive.Positioner.Props,
//     "align" | "alignOffset" | "side" | "sideOffset"
//   >) {
//   return (
//     <MenuPrimitive.Portal>
//       <MenuPrimitive.Positioner
//         className="isolate z-50 outline-none"
//         align={align}
//         alignOffset={alignOffset}
//         side={side}
//         sideOffset={sideOffset}
//       >
//         <MenuPrimitive.Popup
//           data-slot="dropdown-menu-content"
//           className={cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className )}
//           {...props}
//         />
//       </MenuPrimitive.Positioner>
//     </MenuPrimitive.Portal>
//   )
// }

// function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
//   return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
// }

// function DropdownMenuLabel({
//   className,
//   inset,
//   ...props
// }: MenuPrimitive.GroupLabel.Props & {
//   inset?: boolean
// }) {
//   return (
//     <MenuPrimitive.GroupLabel
//       data-slot="dropdown-menu-label"
//       data-inset={inset}
//       className={cn(
//         "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function DropdownMenuItem({
//   className,
//   inset,
//   variant = "default",
//   ...props
// }: MenuPrimitive.Item.Props & {
//   inset?: boolean
//   variant?: "default" | "destructive"
// }) {
//   return (
//     <MenuPrimitive.Item
//       data-slot="dropdown-menu-item"
//       data-inset={inset}
//       data-variant={variant}
//       className={cn(
//         "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
//   return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
// }

// function DropdownMenuSubTrigger({
//   className,
//   inset,
//   children,
//   ...props
// }: MenuPrimitive.SubmenuTrigger.Props & {
//   inset?: boolean
// }) {
//   return (
//     <MenuPrimitive.SubmenuTrigger
//       data-slot="dropdown-menu-sub-trigger"
//       data-inset={inset}
//       className={cn(
//         "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
//         className
//       )}
//       {...props}
//     >
//       {children}
//       <ChevronRightIcon className="ml-auto" />
//     </MenuPrimitive.SubmenuTrigger>
//   )
// }

// function DropdownMenuSubContent({
//   align = "start",
//   alignOffset = -3,
//   side = "right",
//   sideOffset = 0,
//   className,
//   ...props
// }: React.ComponentProps<typeof DropdownMenuContent>) {
//   return (
//     <DropdownMenuContent
//       data-slot="dropdown-menu-sub-content"
//       className={cn("w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
//       align={align}
//       alignOffset={alignOffset}
//       side={side}
//       sideOffset={sideOffset}
//       {...props}
//     />
//   )
// }

// function DropdownMenuCheckboxItem({
//   className,
//   children,
//   checked,
//   inset,
//   ...props
// }: MenuPrimitive.CheckboxItem.Props & {
//   inset?: boolean
// }) {
//   return (
//     <MenuPrimitive.CheckboxItem
//       data-slot="dropdown-menu-checkbox-item"
//       data-inset={inset}
//       className={cn(
//         "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
//         className
//       )}
//       checked={checked}
//       {...props}
//     >
//       <span
//         className="pointer-events-none absolute right-2 flex items-center justify-center"
//         data-slot="dropdown-menu-checkbox-item-indicator"
//       >
//         <MenuPrimitive.CheckboxItemIndicator>
//           <CheckIcon
//           />
//         </MenuPrimitive.CheckboxItemIndicator>
//       </span>
//       {children}
//     </MenuPrimitive.CheckboxItem>
//   )
// }

// function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
//   return (
//     <MenuPrimitive.RadioGroup
//       data-slot="dropdown-menu-radio-group"
//       {...props}
//     />
//   )
// }

// function DropdownMenuRadioItem({
//   className,
//   children,
//   inset,
//   ...props
// }: MenuPrimitive.RadioItem.Props & {
//   inset?: boolean
// }) {
//   return (
//     <MenuPrimitive.RadioItem
//       data-slot="dropdown-menu-radio-item"
//       data-inset={inset}
//       className={cn(
//         "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
//         className
//       )}
//       {...props}
//     >
//       <span
//         className="pointer-events-none absolute right-2 flex items-center justify-center"
//         data-slot="dropdown-menu-radio-item-indicator"
//       >
//         <MenuPrimitive.RadioItemIndicator>
//           <CheckIcon
//           />
//         </MenuPrimitive.RadioItemIndicator>
//       </span>
//       {children}
//     </MenuPrimitive.RadioItem>
//   )
// }

// function DropdownMenuSeparator({
//   className,
//   ...props
// }: MenuPrimitive.Separator.Props) {
//   return (
//     <MenuPrimitive.Separator
//       data-slot="dropdown-menu-separator"
//       className={cn("-mx-1 my-1 h-px bg-border", className)}
//       {...props}
//     />
//   )
// }

// function DropdownMenuShortcut({
//   className,
//   ...props
// }: React.ComponentProps<"span">) {
//   return (
//     <span
//       data-slot="dropdown-menu-shortcut"
//       className={cn(
//         "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export {
//   DropdownMenu,
//   DropdownMenuPortal,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuLabel,
//   DropdownMenuItem,
//   DropdownMenuCheckboxItem,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubTrigger,
//   DropdownMenuSubContent,
// }

'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';

import { cn } from '@/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
  }
>(({ className, inset, variant = 'default', ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      variant === 'destructive' &&
        'text-destructive focus:bg-destructive/10 focus:text-destructive',
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
