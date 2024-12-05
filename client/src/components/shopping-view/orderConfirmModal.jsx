import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmationModal({
  isModalOpen,
  setIsModalOpen,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Order Confirmed!</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center flex-col space-y-4">
            {/* Animated Tick */}
            <div className="w-16 h-16 border-4 border-green-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500">
              Thank you! Your order has been confirmed successfully.
            </p>
            <Button onClick={() => navigate("/shop/account")}>
              View Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
