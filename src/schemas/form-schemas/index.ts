import { zodResolver } from 'mantine-form-zod-resolver'
import { ZodType } from 'zod'
import { FormErrors } from '@mantine/form'

export interface ZodResolverOptions {
   errorPriority?: 'first' | 'last'
}

export function formResolve(
   schema: ZodType,
   options?: ZodResolverOptions,
): (values: Record<string, unknown>) => FormErrors {
   return zodResolver(schema, options)
}
