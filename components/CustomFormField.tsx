import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from 'react-hook-form';
import { FormFieldType } from './forms/PatientForm';

interface CustomProps {
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,  
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelection?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({field, props}: {field: any; props: CustomProps}) => {
  return (
    <Input
      type='text'
      placeholder='Your name'
    />
  )
}

const CustomFormField = (props: CustomProps) => {
  const {control, fieldType, name, label} = props

  return (
    <div>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {fieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
              )}

              <RenderField field={field} props={props} />

              <FormMessage className='shad-error' />

            </FormItem>
          )}
        />
    </div>
  )
}

export default CustomFormField