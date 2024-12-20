"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.action";

export enum FormFieldType {
  INPUT="input",
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  DATE_PICKER = 'datePicker',
  SKELETON = 'skeleton',
}

export const PatientForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit ({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)

    try {
      const userData = {name, email, phone}

      const user = await createUser(userData)

      if (user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <section className="mb-12 space-y-4">
        <h1 className="header">Hi there👋🏼</h1>
        <p className="text-dark-700">Schedule your appoinment</p>
      </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control} 
          name="name"
          label="Your Full Name"
          placeholder="Your name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control} 
          name="email"
          label="Your Email Address"
          placeholder="you@email.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control} 
          name="phone"
          label="Your Phone Number"
          placeholder="XXXX567890"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};