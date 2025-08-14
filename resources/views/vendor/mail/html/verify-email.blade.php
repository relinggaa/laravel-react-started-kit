@component('mail::message')
# Verifikasi Alamat Email Anda

Halo {{ $user->name }},

Silakan klik tombol di bawah untuk memverifikasi alamat email Anda:

@component('mail::button', ['url' => $verificationUrl])
Verifikasi Email
@endcomponent

Jika Anda tidak membuat permintaan ini, abaikan email ini.

Terima kasih,<br>
{{ config('app.name') }}
@endcomponent