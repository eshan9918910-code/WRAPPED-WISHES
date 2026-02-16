
import { GoogleGenAI } from "@google/genai";
import { CartItem, UserDetails } from "../types";

export const generateOrderSummaryForEmail = async (
  cart: CartItem[],
  userDetails: UserDetails,
  total: number,
  paymentMethod: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const itemsList = cart.map(item => `- ${item.name} (x${item.quantity}): ₹${item.price * item.quantity}`).join('\n');
  
  const prompt = `
    You are an automated assistant for an e-commerce brand called "Wrapped Wishes". 
    Generate a formal and elegant order summary email content. 
    IMPORTANT: This email is being sent to the merchant (eshan9918910@gmail.com) and the customer.
    
    Customer Name: ${userDetails.fullName}
    Customer Email: ${userDetails.email}
    Customer Phone: ${userDetails.phone}
    Customer Address: ${userDetails.address}, ${userDetails.city}, ${userDetails.zipCode}
    Payment Method: ${paymentMethod}
    Total Order Amount (incl GST and Discounts): ₹${total.toFixed(2)}
    
    Items:
    ${itemsList}
    
    If the payment is Cash on Delivery, remind the courier about the total amount. 
    If it is UPI, mention that the screenshot has been uploaded for verification.
    Keep the tone sophisticated, professional, and celebratory.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Order summary could not be generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate AI summary. Your order has been placed successfully!";
  }
};
