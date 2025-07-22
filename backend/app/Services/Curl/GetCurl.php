<?php

namespace App\Services\Curl;

use Exception;

class GetCurl
{
    protected $url;
    protected $headers = [];

    public function __construct(string $url, array $headers = [])
    {
        $this->url = $url;
        foreach ($headers as $key => $value) {
            $this->headers[] = "$key: $value";
        }
    }

    public function execute(): array
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $this->url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headers);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            throw new Exception('Curl error: ' . curl_error($ch));
        }

        curl_close($ch);

        $result = json_decode($response, true);

        if (!$result || !isset($result['data'])) {
            return [
                'status' => false,
                'message' => $result['message']
            ];
        }

        return $result['data'];
    }
}
