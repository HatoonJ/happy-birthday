$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 5500
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port/"

$mime = @{
  ".html" = "text/html"; ".css" = "text/css"; ".js" = "application/javascript";
  ".svg" = "image/svg+xml"; ".png" = "image/png"; ".jpg" = "image/jpeg"; ".ico" = "image/x-icon"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response
  $path = $request.Url.LocalPath
  if ($path.EndsWith("/")) { $path = $path + "index.html" }
  $filePath = Join-Path $root ($path.TrimStart("/"))

  $response.KeepAlive = $false

  if (Test-Path $filePath -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($filePath)
    $contentType = $mime[$ext]
    if (-not $contentType) { $contentType = "application/octet-stream" }
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $response.ContentType = $contentType
    $response.ContentLength64 = $bytes.Length
    if ($request.HttpMethod -ne "HEAD") {
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
  } else {
    $response.StatusCode = 404
    $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
    $response.ContentLength64 = $notFound.Length
    if ($request.HttpMethod -ne "HEAD") {
      $response.OutputStream.Write($notFound, 0, $notFound.Length)
    }
  }
  $response.OutputStream.Close()
}
