import axios from "axios";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const ApiComponent = () => {
	useEffect(() => {
		// Define the API endpoint
		const apiUrl = "http://139.59.177.72/api/books?page=1"; // Example API
		// Make an API request
		axios
			.get(apiUrl)
			.then((response) => {
				console.log("API Response:", response.data);
			})
			.catch((error) => {
				console.error("API Error:", error);
			});
	}, []);

	return (
		<View>
			<Text>Check the console for API response</Text>
		</View>
	);
};

export default ApiComponent;
