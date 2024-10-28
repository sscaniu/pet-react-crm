import { apiClient } from "@/fetcher/instance";
import {
	LoadUpcomingAppointmentsResponse,
	upcomingAppointmentSchema,
} from "@/schemas/appointment/appointment-info-schema";
import { Fetcher } from "swr";

export const listUpcomingAppointmentsByCustomerId: Fetcher<
	LoadUpcomingAppointmentsResponse,
	{ url: string; customerId: string }
> = async ({ url, customerId }) => {
	try {
		const { data } = await apiClient.get(`${url}/${customerId}`);

		const responseValidationResult = upcomingAppointmentSchema.safeParse(data);
		if (!responseValidationResult.success) {
			//TODO: To check the schema from the api response and will be removed later
			console.error(
				"Response validation failed:",
				responseValidationResult.error.errors,
			);
		}

		return responseValidationResult.success
			? responseValidationResult.data
			: data;
	} catch (error) {
		//TODO: To check the api req error log and will be removed later
		console.log("API requset failed:", error);
		throw error;
	}
};
