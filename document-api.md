# Documentation

All WinerySwap pairs consist of two different tokens. BNB is not a native currency in WinerySwap, and is represented only by WBNB in the pairs.

The canonical WBNB address used by the WinerySwap interface is `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`.

## [`/v1/mainnet/assets/summary`](https://dev.winery.land/api/v1/mainnet/assets/summary)

Returns data for the top ~1000 WinerySwap pairs, sorted by reserves. 

### Request

`GET https://dev.winery.land/api/v1/mainnet/assets/summary`

### Response

```json5
{
  "data": {
    "0x..._0x...": {                  // BEP20 token addresses, joined by an underscore
      "price": "...",                 // price denominated in token1/token0
      "base_volume": "...",           // last 24h volume denominated in token0
      "quote_volume": "...",          // last 24h volume denominated in token1
      "liquidity": "...",             // liquidity denominated in USD
      "liquidity_BNB": "..."          // liquidity denominated in BNB
    },
    // ...
  }
}
```

## [`/v1/mainnet/assets/all-tokens`](https://dev.winery.land/api/v1/mainnet/assets/all-tokens)

Returns the tokens in the top ~1000 pairs on WinerySwap, sorted by reserves.

### Request

`GET https://dev.winery.land/api/v1/mainnet/assets/all-tokens`

### Response

```json5
{
  "data": {
    "0x...": {                        // the address of the BEP20 token
      "name": "...",                  // not necessarily included for BEP20 tokens
      "symbol": "...",                // not necessarily included for BEP20 tokens
      "price": "...",                 // price denominated in USD
      "price_BNB": "...",             // price denominated in BNB
    },
    // ...
  }
}
```

## [`/mainnet/assets/tokens/0x...`](https://dev.winery.land/api/v1/mainnet/assets/tokens/0xe7eada32caf827d3ba8cb1074830d803c9bd48c3)

Returns the token information, based on address.

### Request

`GET https://dev.winery.land/api/v1/mainnet/assets/tokens/0xe7eada32caf827d3ba8cb1074830d803c9bd48c3`

### Response

```json5
{
  "data": {
    "name": "...",                    // not necessarily included for BEP20 tokens
    "symbol": "...",                  // not necessarily included for BEP20 tokens
    "price": "...",                   // price denominated in USD
    "price_BNB": "...",               // price denominated in BNB
  }
}
```

## [`/v1/mainnet/assets/pairs`](https://dev.winery.land/api/v1/mainnet/assets/pairs)

Returns data for the top ~1000 WinerySwap pairs, sorted by reserves.

### Request

`GET https://dev.winery.land/api/v1/mainnet/assets/pairs`

### Response

```json5
{
  "data": {
    "0x..._0x...": {                  // the asset ids of BNB and BEP20 tokens, joined by an underscore
      "pair_address": "0x...",        // pair address
      "base_name": "...",             // token0 name
      "base_symbol": "...",           // token0 symbol
      "base_address": "0x...",        // token0 address
      "quote_name": "...",            // token1 name
      "quote_symbol": "...",          // token1 symbol
      "quote_address": "0x...",       // token1 address
      "price": "...",                 // price denominated in token1/token0
      "base_volume": "...",           // volume denominated in token0
      "quote_volume": "...",          // volume denominated in token1
      "liquidity": "...",             // liquidity denominated in USD
      "liquidity_BNB": "..."          // liquidity denominated in BNB
    },
    // ...
  }
}
```



## [`/v1/mainnet/assets/stats`](https://dev.winery.land/api/v1/mainnet/assets/stats)

Returns data for last ~30 days WinerySwap volume, liquidity.

### Request

`GET https://dev.winery.land/api/v1/mainnet/assets/stats`

### Response

```json5
{
    "data": {
        "volume": [
            {
                "date": "...",        // Timestamp
                "volumeUSD": "..."    // Day's volume in USD
            },
            {
                "date": "...",        // Timestamp
                "volumeUSD": "..."    // Day's volume in USD
            },
            //  ...
        ],
        "liquidity": [
          {
                "date": "...",        // Timestamp
                "liquidityUSD": "..." // Day's liquidity day in USD
            },
            {
                "date": "...",        // Timestamp
                "liquidityUSD": "..." // Day's liquidity in USD
            },
            // ... 
        ]
    },
}
```
