<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Azany B2B Order Shipped Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: white;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .logo {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo img {
            max-width: 150px;
        }

        h1,
        h2 {
            text-align: center;
            color: #333;
        }

        .subtitle {
            text-align: left;
            color: #666;
            margin-bottom: 20px;
        }

        .banner {
            color: white;
            padding: 20px;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
        }

        .banner-text {
            position: absolute;
            top: 20px;
            left: 20px;
            background-color: white;
            color: black;
            padding: 10px;
            font-weight: bold;
        }

        .banner img {
            max-width: 100%;
            height: auto;
        }

        .message {
            text-align: center;
            margin-bottom: 20px;
        }

        .btn {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px;
            background-color: #007bff;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
        }

        .purchase-details {
            background-color: #f9f9f9;
            padding: 20px;
            margin-bottom: 20px;
        }

        .product {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
        }

        .product img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            margin-right: 20px;
        }

        .product-info h3 {
            margin-top: 0;
            color: #333;
        }

        .product-info p {
            color: #666;
            margin: 5px 0;
        }

        .price {
            color: #007bff;
            font-weight: bold;
        }

        .total {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            font-weight: bold;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            font-size: 0.9em;
        }

        .footer-logo {
            flex: 1;
        }

        .footer-logo img {
            max-width: 150px;
        }

        .footer-info {
            flex: 1;
            display: flex;
            justify-content: space-between;
        }

        .footer-info div {
            flex: 1;
        }

        .footer h3 {
            color: #333;
            margin-bottom: 10px;
        }

        .footer p {
            color: #666;
            margin: 5px 0;
        }

        @media (max-width: 600px) {
            .container {
                margin: 10px;
                padding: 10px;
            }

            .product {
                flex-direction: column;
            }

            .product img {
                width: 100%;
                height: auto;
                margin-right: 0;
                margin-bottom: 10px;
            }

            .footer,
            .footer-info {
                flex-direction: column;
            }

            .footer-logo {
                margin-bottom: 20px;
            }

        }
    </style>
</head>

<body>
    <div class="container">
        <div class="logo">
            <img src="https://azany-uploads.s3.amazonaws.com/assets/logo.png" alt="Azany Logo">
        </div>
        <h1>Hi {{ $orderedItems['buyer_name'] }},</h1>
        <p></p>
        <h2>Order {{ $orderedItems['order_number'] }} Has been Shipped.</h2>
        <p class="subtitle">Your #1 Global E-commerce Platform</p>

        <div class="message">
            <p>
                Great news! Your order {{ $orderedItems['order_number'] }} from {{ config('app.name') }} has been
                shipped and is on its way!
                You can track its progress here: <a href="">Track Order</a>
                Thank you for your order! We appreciate your business.
                If you have any questions, please don't hesitate to contact us at <a
                    href="mailto:support@azany.com">support@azany.com</a>
                Best regards,
            </p>
            The {{ config('app.name') }} Team"
        </div>


        <div class="footer">
            <div class="footer-logo">
                <img src="https://azany-uploads.s3.amazonaws.com/assets/logo.png" alt="Azany Logo">
            </div>
            <div class="footer-info">
                <div>
                    <h3>Support</h3>
                    <p>333 Freemont Street, California</p>
                    <p>support@azany.com</p>
                    <p>+88015-88888-9999</p>
                </div>
                <div>
                    <h3>Quick Links</h3>
                    <p>Privacy Policy</p>
                    <p>Terms Of Use</p>
                    <p>FAQ</p>
                    <p>Contact</p>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
