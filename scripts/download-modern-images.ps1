$ua = "DSH-modern-images/1.0 (history timeline project; contact via repo)"
$dest = "D:\project\git\5000years\public\images\events"

# 每条事件: id, year(输出目录), 搜索关键词, 输出文件名
# 选词原则：用英文事件名+年份/地名，尽量命中同时代照片或绘画
$events = @(
  @{ Id="opium-war-1840"; Year="1840"; Out="cn-opium-war-1840.jpg"; Q="Opium War 1840 Chinese war junk" },
  @{ Id="taiping-rebellion-1851"; Year="1851"; Out="cn-taiping-rebellion-1851.jpg"; Q="Taiping Rebellion" },
  @{ Id="yangwu-movement-1861"; Year="1861"; Out="cn-yangwu-movement-1861.jpg"; Q="Self-Strengthening Movement China" },
  @{ Id="sino-japanese-war-1894"; Year="1894"; Out="cn-sino-japanese-war-1894.jpg"; Q="First Sino-Japanese War 1894" },
  @{ Id="wuxu-reform-1898"; Year="1898"; Out="cn-wuxu-reform-1898.jpg"; Q="Hundred Days Reform 1898" },
  @{ Id="boxer-rebellion-1900"; Year="1900"; Out="cn-boxer-rebellion-1900.jpg"; Q="Boxer Rebellion 1900" },
  @{ Id="xinhai-revolution-1911"; Year="1911"; Out="cn-xinhai-revolution-1911.jpg"; Q="Xinhai Revolution" },
  @{ Id="minguo-establish-1912"; Year="1912"; Out="cn-minguo-establish-1912.jpg"; Q="Republic of China 1912 establishment" },
  @{ Id="new-culture-movement-1915"; Year="1915"; Out="cn-new-culture-movement-1915.jpg"; Q="New Culture Movement China" },
  @{ Id="may-fourth-movement-1919"; Year="1919"; Out="cn-may-fourth-movement-1919.jpg"; Q="May Fourth Movement 1919" },
  @{ Id="cn-shanghai-communist-group-192008"; Year="1920"; Out="cn-shanghai-communist-group-1920.jpg"; Q="Communist Party China Shanghai 1920" },
  @{ Id="cn-haiyuan-earthquake-192012"; Year="1920"; Out="cn-haiyuan-earthquake-1920.jpg"; Q="Haiyuan earthquake 1920" },
  @{ Id="cn-sun-yat-sen-extraordinary-president-192105"; Year="1921"; Out="cn-sun-yat-sen-president-1921.jpg"; Q="Sun Yat-sen 1921 president" },
  @{ Id="cpc-founding-1921"; Year="1921"; Out="cn-cpc-founding-1921.jpg"; Q="First National Congress Communist Party China Shanghai" },
  @{ Id="cn-cpc-second-congress-192207"; Year="1922"; Out="cn-cpc-second-congress-1922.jpg"; Q="Second National Congress CPC China" },
  @{ Id="cn-cpc-third-congress-192306"; Year="1923"; Out="cn-cpc-third-congress-1923.jpg"; Q="Third National Congress CPC China" },
  @{ Id="cn-kmt-first-congress-192401"; Year="1924"; Out="cn-kmt-first-congress-1924.jpg"; Q="Kuomintang First National Congress 1924" },
  @{ Id="cn-whampoa-military-academy-192406"; Year="1924"; Out="cn-whampoa-academy-1924.jpg"; Q="Whampoa Military Academy 1924" },
  @{ Id="cn-sun-yat-sen-northbound-192411"; Year="1924"; Out="cn-sun-yat-sen-northbound-1924.jpg"; Q="Sun Yat-sen 1924" },
  @{ Id="cn-sun-yat-sen-death-192503"; Year="1925"; Out="cn-sun-yat-sen-death-1925.jpg"; Q="Sun Yat-sen death 1925 funeral" },
  @{ Id="cn-may-thirtieth-movement-192505"; Year="1925"; Out="cn-may-thirtieth-1925.jpg"; Q="May Thirtieth Movement 1925" },
  @{ Id="cn-northern-expedition-begins-192607"; Year="1926"; Out="cn-northern-expedition-1926.jpg"; Q="Northern Expedition China 1926" },
  @{ Id="cn-shanghai-massacre-192704"; Year="1927"; Out="cn-shanghai-massacre-1927.jpg"; Q="Shanghai massacre 1927 April 12" },
  @{ Id="cn-nanchang-uprising-192708"; Year="1927"; Out="cn-nanchang-uprising-1927.jpg"; Q="Nanchang uprising 1927" },
  @{ Id="cn-autumn-harvest-uprising-192709"; Year="1927"; Out="cn-autumn-harvest-uprising-1927.jpg"; Q="Autumn Harvest Uprising 1927" },
  @{ Id="cn-huanggutun-incident-192806"; Year="1928"; Out="cn-huanggutun-incident-1928.jpg"; Q="Huanggutun incident 1928 Zhang Zuolin" },
  @{ Id="cn-northeast-flag-replacement-192812"; Year="1928"; Out="cn-northeast-flag-1928.jpg"; Q="Northeast Flag Replacement 1928 Zhang Xueliang" },
  @{ Id="cn-gutian-congress-192912"; Year="1929"; Out="cn-gutian-congress-1929.jpg"; Q="Gutian Congress 1929" },
  @{ Id="september-18-incident-1931"; Year="1931"; Out="cn-september-18-incident-1931.jpg"; Q="Mukden Incident 1931 September 18" },
  @{ Id="cn-january-28-incident-193201"; Year="1932"; Out="cn-january-28-incident-1932.jpg"; Q="January 28 Incident 1932 Shanghai" },
  @{ Id="cn-manchukuo-founded-193203"; Year="1932"; Out="cn-manchukuo-1932.jpg"; Q="Manchukuo 1932 establishment" },
  @{ Id="cn-defense-great-wall-193301"; Year="1933"; Out="cn-defense-great-wall-1933.jpg"; Q="Defense of the Great Wall 1933" },
  @{ Id="cn-long-march-begins-193410"; Year="1934"; Out="cn-long-march-1934.jpg"; Q="Long March China 1934" },
  @{ Id="cn-zunyi-conference-193501"; Year="1935"; Out="cn-zunyi-conference-1935.jpg"; Q="Zunyi Conference 1935" },
  @{ Id="cn-long-march-arrives-shaanbei-193510"; Year="1935"; Out="cn-long-march-shaanbei-1935.jpg"; Q="Long March Yanan 1935" },
  @{ Id="xian-incident-1936"; Year="1936"; Out="cn-xian-incident-1936.jpg"; Q="Xi'an Incident 1936" },
  @{ Id="lugou-bridge-incident-1937"; Year="1937"; Out="cn-marco-polo-bridge-1937.jpg"; Q="Marco Polo Bridge Incident 1937" },
  @{ Id="cn-shanghai-battle-193708"; Year="1937"; Out="cn-shanghai-battle-1937.jpg"; Q="Battle of Shanghai 1937" },
  @{ Id="cn-nanjing-falls-193712"; Year="1937"; Out="cn-nanjing-massacre-1937.jpg"; Q="Nanking Massacre 1937" },
  @{ Id="cn-taierzhuang-battle-193803"; Year="1938"; Out="cn-taierzhuang-1938.jpg"; Q="Battle of Taierzhuang 1938" },
  @{ Id="cn-wuhan-battle-193806"; Year="1938"; Out="cn-wuhan-battle-1938.jpg"; Q="Battle of Wuhan 1938" },
  @{ Id="cn-battle-changsha-193909"; Year="1939"; Out="cn-changsha-battle-1939.jpg"; Q="Battle of Changsha 1939" },
  @{ Id="cn-chongqing-bombing-194005"; Year="1940"; Out="cn-chongqing-bombing-1940.jpg"; Q="Bombing of Chongqing 1940" },
  @{ Id="cn-hong-kong-battle-194112"; Year="1941"; Out="cn-hong-kong-battle-1941.jpg"; Q="Battle of Hong Kong 1941" },
  @{ Id="cn-chinese-expeditionary-force-burma-194203"; Year="1942"; Out="cn-chinese-expeditionary-force-1942.jpg"; Q="Chinese Expeditionary Force Burma 1942" },
  @{ Id="cn-extraterritoriality-abolished-194301"; Year="1943"; Out="cn-extraterritoriality-abolished-1943.jpg"; Q="Treaty extraterritoriality China 1943" },
  @{ Id="cn-changde-battle-194311"; Year="1943"; Out="cn-changde-battle-1943.jpg"; Q="Battle of Changde 1943" },
  @{ Id="cn-dixie-mission-yanan-194407"; Year="1944"; Out="cn-dixie-mission-yanan-1944.jpg"; Q="Dixie Mission Yan'an 1944" },
  @{ Id="cn-land-law-outline-194710"; Year="1947"; Out="cn-land-law-outline-1947.jpg"; Q="Chinese Land Law Outline 1947" },
  @{ Id="cn-may-day-slogans-194804"; Year="1948"; Out="cn-may-day-slogans-1948.jpg"; Q="May Day Slogans 1948 Communist Party China" }
)

# 过滤函数：排除 svg、纪念雕塑特写、纪念馆入口等不理想结果
function GoodResult($title, $mime) {
  if ($title -match '\.svg$') { return $false }
  if ($title -match '\.pdf$') { return $false }
  if ($title -match '(?i)memorial park|museum|entrance|exhibition|monument') { return $false }
  if ($mime -eq 'image/svg+xml') { return $false }
  return $true
}

$results = @()
$success = 0
$fail = 0

foreach ($e in $events) {
  Write-Host "=== $($e.Id) ($($e.Q)) ==="
  $searchUrl = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=$([uri]::EscapeDataString($e.Q))&gsrlimit=15&prop=imageinfo&iiprop=url|extmetadata|mime&iiurlwidth=900&format=json"
  
  $found = $false
  try {
    $r = Invoke-RestMethod -Uri $searchUrl -UserAgent $ua -TimeoutSec 60
    $pages = $r.query.pages
    if (-not $pages) { Write-Host "  无搜索结果"; $fail++; Start-Sleep -Seconds 2; continue }
    $keys = $pages | Get-Member -MemberType NoteProperty | Where-Object {$_.Name -match '^\d'} | Select-Object -ExpandProperty Name
    
    foreach ($k in $keys) {
      $p = $pages.$k
      if (-not $p.imageinfo) { continue }
      $ii = $p.imageinfo[0]
      $mime = $ii.mime
      $title = $p.title -replace '^File:',''
      
      if (-not (GoodResult $title $mime)) { continue }
      
      $url = if($ii.thumburl){$ii.thumburl}else{$ii.url}
      $lic = ($ii.extmetadata.LicenseShortName.value -replace '<[^>]+>','').Trim()
      $artistRaw = $ii.extmetadata.Artist.value -replace '<[^>]+>',''
      $artist = $artistRaw.Trim()
      if ($artist.Length -gt 120) { $artist = $artist.Substring(0,120) }
      
      $outPath = Join-Path (Join-Path $dest $e.Year) $e.Out
      try {
        $req = [System.Net.HttpWebRequest]::Create($url)
        $req.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        $req.Referer = "https://commons.wikimedia.org/"
        $req.Timeout = 45000
        $req.AllowAutoRedirect = $true
        $resp = $req.GetResponse()
        $stream = $resp.GetResponseStream()
        $fs = [System.IO.File]::Create($outPath)
        $buffer = New-Object byte[] 81920
        while (($n = $stream.Read($buffer, 0, $buffer.Length)) -gt 0) { $fs.Write($buffer, 0, $n) }
        $fs.Close(); $resp.Close()
        $sz = (Get-Item $outPath).Length
        $b = [System.IO.File]::ReadAllBytes($outPath)
        $isJpeg = ($b.Length -gt 2 -and $b[0] -eq 0xff -and $b[1] -eq 0xd8 -and $b[2] -eq 0xff)
        $isPng = ($b.Length -gt 4 -and $b[0] -eq 0x89 -and $b[1] -eq 0x50 -and $b[2] -eq 0x4e -and $b[3] -eq 0x47)
        
        if (($isJpeg -or $isPng) -and $sz -gt 2048) {
          $ext = if($isJpeg){'.jpg'}else{'.png'}
          # 如果实际是 png 但文件名是 jpg，重命名
          if ($isPng -and $e.Out -match '\.jpg$') {
            $newOut = $e.Out -replace '\.jpg$','.png'
            Rename-Item $outPath $newOut -Force
            $e.Out = $newOut
            $outPath = Join-Path (Join-Path $dest $e.Year) $newOut
          }
          Write-Host "  OK: $title [$lic] $sz bytes"
          $results += [PSCustomObject]@{
            Id=$e.Id; Year=$e.Year; Out=$e.Out; CommonsFile=$title; License=$lic; Author=$artist
          }
          $found = $true
          $success++
          break
        } else {
          Write-Host "  跳过(格式/尺寸): $title ($sz bytes)"
        }
      } catch {
        Write-Host "  下载失败: $($_.Exception.Message)"
      }
    }
    if (-not $found) { Write-Host "  未找到合适图片"; $fail++ }
  } catch {
    Write-Host "  搜索失败: $($_.Exception.Message)"
    $fail++
  }
  Start-Sleep -Seconds 3
}

Write-Host "`n==== 成功 $success / 失败 $fail ===="

# 输出结果 JSON 供后续写入 YAML
$resultsJson = $results | ConvertTo-Json -Depth 3
if ($results.Count -eq 1) { $resultsJson = "[$resultsJson]" }
$jsonPath = "D:\project\git\5000years\modern-images-result.json"
[System.IO.File]::WriteAllText($jsonPath, $resultsJson, [System.Text.UTF8Encoding]::new($false))
Write-Host "结果已保存到 $jsonPath"