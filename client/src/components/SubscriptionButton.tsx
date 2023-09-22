"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";

type Props = { isPro: boolean };

const SubscriptionButton = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      onClick={handleSubscription}
      variant="outline"
      size="lg"
      className="active:scale-95 transition-transform duration-75 text-secondary-foreground"
    >
      {props.isPro ? "Manage Subscriptions" : "Premium Free Trial"}
    </Button>
  );
};

export default SubscriptionButton;
