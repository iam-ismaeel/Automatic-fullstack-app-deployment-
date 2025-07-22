<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WithdrawalNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $request;
    private $status;

    /**
     * Create a new notification instance.
     */
    public function __construct($request, $status)
    {
        $this->request = $request;
        $this->status = $status;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $defaultPaymentMethod = $notifiable->paymentMethods->where('is_default', true)->first();
        $accountNumber = $defaultPaymentMethod ? $defaultPaymentMethod->account_number : 'N/A';
        $accountName = $defaultPaymentMethod ? $defaultPaymentMethod->account_name : 'N/A';

        return (new MailMessage)
            ->subject('Withdrawal Request Update')
            ->line("Your withdrawal request (ID: {$this->request->id}) has been {$this->status}.")
            ->line("Amount: {$this->request->amount}")
            ->line("Sent to Account: {$accountName} (****" . substr($accountNumber, -4) . ")")
            ->line('Thank you for using our service.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
