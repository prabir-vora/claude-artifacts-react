export const SAMPLE_ASSIGNMENT_ADSL = [
    {
      "section_id": "section_inflation",
      "title": "Inflation",
      "content": [
        {
          "type": "text",
          "content": "When necessary, please round to two decimal places.",
          "format": null,
          "source": null,
          "ocr_id": "b5830"
        },
        {
          "id": "q1",
          "type": "calculation",
          "prompt": [
            {
              "type": "text",
              "content": "Calculate the GDP deflator for each year.",
              "format": null,
              "source": null,
              "ocr_id": "a5422"
            }
          ],
          "options": null,
          "points": 10.0,
          "required": true,
          "optional": false
        },
        {
          "type": "table",
          "content": "<html><body><table><tr><td>Year</td><td>Nominal GDP (billions of USD)</td><td>Real GDP (billions of 2012 USD)</td><td>Price Index (GDP deflator)</td></tr><tr><td>2011</td><td>15600</td><td>15892</td><td>98.16</td></tr><tr><td>2012</td><td>16254</td><td>16254</td><td>100</td></tr><tr><td>2013</td><td>16843</td><td>16553</td><td></td></tr><tr><td>2014</td><td>17551</td><td>16932</td><td></td></tr><tr><td>2015</td><td>18206</td><td>17390</td><td></td></tr><tr><td>2016</td><td>18695</td><td>17680</td><td></td></tr><tr><td>2017</td><td>19477</td><td>18077</td><td></td></tr><tr><td>2018</td><td>20533</td><td>18609</td><td></td></tr><tr><td>2019</td><td>21381</td><td>19036</td><td></td></tr><tr><td>2020</td><td>21060</td><td>18509</td><td></td></tr><tr><td>2021</td><td>23315</td><td>19610</td><td></td></tr><tr><td>2022</td><td>25463</td><td>20014</td><td></td></tr></table></body></html>",
          "format": null,
          "source": null,
          "ocr_id": "o3730"
        },
        {
          "type": "table",
          "content": "<html><body><table><tr><td>Example: GDPDeflator: \u4e8c GDPd2011 15600 X 100 = 98.162 15892</td><td>NominalGDP -X 100 RealGDP</td></tr></table></body></html>",
          "format": null,
          "source": null,
          "ocr_id": "g1894"
        },
        {
          "id": "q2",
          "type": "calculation",
          "prompt": [
            {
              "type": "text",
              "content": "Using the GDP Deflator, calculate the annual rate of inflation for each year.",
              "format": null,
              "source": null,
              "ocr_id": "c3364"
            }
          ],
          "options": null,
          "points": 10.0,
          "required": true,
          "optional": false
        },
        {
          "type": "text",
          "content": "Example: \\( \\text{inflation}_{2012}=\\frac{GDPd_{12}-GDPd_{11}}{GDPd_{11}}\\times100 \\) \\( \\text{inflation}_{2012}=\\frac{100-98.16}{98.16}\\times100=1.874 \\) Note: Here, inflation represents the percent change in the GDP deflator from one period to the next.",
          "format": null,
          "source": null,
          "ocr_id": "i2545"
        },
        {
          "id": "q3",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2012: 1.87%",
              "format": null,
              "source": null,
              "ocr_id": "h1822"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q4",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2013:",
              "format": null,
              "source": null,
              "ocr_id": "h1822"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q5",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2014:",
              "format": null,
              "source": null,
              "ocr_id": "h1822"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q6",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2015:",
              "format": null,
              "source": null,
              "ocr_id": "h1822"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q7",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2016:",
              "format": null,
              "source": null,
              "ocr_id": "h1822"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q8",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2017:",
              "format": null,
              "source": null,
              "ocr_id": "h1822"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q9",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2019:",
              "format": null,
              "source": null,
              "ocr_id": "h1822"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q10",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2021:",
              "format": null,
              "source": null,
              "ocr_id": "h1822"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q11",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2022:",
              "format": null,
              "source": null,
              "ocr_id": "h1822"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "type": "text",
          "content": "\u201cInflation\u201d by Billy Lemus is licensed CC BY 4.0",
          "format": null,
          "source": null,
          "ocr_id": "y7220"
        }
      ],
      "points": 30.0,
      "metadata": null
    },
    {
      "section_id": "section_cpi_inflation",
      "title": "Calculating Inflation Rate using the Consumer Price Index (CPI)",
      "content": [
        {
          "type": "text",
          "content": "Calculating inflation rate using the Consumer Price Index (CPI)",
          "format": null,
          "source": null,
          "ocr_id": "l1862"
        },
        {
          "type": "table",
          "content": "<html><body><table><tr><td>Year</td><td>Price Index (Consumer Price Index)</td></tr><tr><td>2011</td><td>224.92</td></tr><tr><td>2012</td><td>229.59</td></tr><tr><td>2013</td><td>232.95</td></tr><tr><td>2014</td><td>236.72</td></tr><tr><td>2015</td><td>237.00</td></tr><tr><td>2016</td><td>240.01</td></tr><tr><td>2017</td><td>245.12</td></tr><tr><td>2018</td><td>251.10</td></tr><tr><td>2019</td><td>255.65</td></tr><tr><td>2020</td><td>258.85</td></tr><tr><td>2021</td><td>270.97</td></tr><tr><td>2022</td><td>292.61</td></tr></table></body></html>",
          "format": null,
          "source": null,
          "ocr_id": "f2921"
        },
        {
          "id": "q12",
          "type": "calculation",
          "prompt": [
            {
              "type": "text",
              "content": "Using the CPI, calculate the annual rate of inflation for each year.",
              "format": null,
              "source": null,
              "ocr_id": "r5209"
            }
          ],
          "options": null,
          "points": 10.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q13",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2012: 2.08%",
              "format": null,
              "source": null,
              "ocr_id": "t1149"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q14",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2013:",
              "format": null,
              "source": null,
              "ocr_id": "t1149"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q15",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2014:",
              "format": null,
              "source": null,
              "ocr_id": "t1149"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q16",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2015:",
              "format": null,
              "source": null,
              "ocr_id": "t1149"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q17",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2016:",
              "format": null,
              "source": null,
              "ocr_id": "t1149"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q18",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2017:",
              "format": null,
              "source": null,
              "ocr_id": "t1149"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q19",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2019:",
              "format": null,
              "source": null,
              "ocr_id": "t1149"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q20",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2021:",
              "format": null,
              "source": null,
              "ocr_id": "t1149"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q21",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "2022:",
              "format": null,
              "source": null,
              "ocr_id": "t1149"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "type": "text",
          "content": "Note: Here, inflation represents the percent change in the CPI from one period to the next.",
          "format": null,
          "source": null,
          "ocr_id": "t1149"
        }
      ],
      "points": 30.0,
      "metadata": null
    },
    {
      "section_id": "section_custom_cpi",
      "title": "Calculating Inflation by Creating Your Own Consumer Price Index (CPI)",
      "content": [
        {
          "type": "text",
          "content": "Calculating inflation by creating your own consumer price index (CPI)",
          "format": null,
          "source": null,
          "ocr_id": "w6705"
        },
        {
          "type": "text",
          "content": "Step one: Create your own basket of goods by identifying the goods and services your household would consume in a typical year. Once your basket has been determined, use the same basket for each year. Use YEAR ONE as your base year.",
          "format": null,
          "source": null,
          "ocr_id": "i8092"
        },
        {
          "type": "text",
          "content": "Step two: Calculate the cost of your basket for each year. Step three: Calculate your consumer price index for each year by taking the cost of the basket for the year in question, dividing it by the cost of that same basket in the base year, and multiplying the result by 100. Step four: Calculate the percent change of the consumer price index for each year.",
          "format": null,
          "source": null,
          "ocr_id": "q8651"
        },
        {
          "type": "table",
          "content": "<html><body><table><tr><td>Goods and Services</td><td>Quantity</td><td>Year 1 Prices ($)</td><td>Year 2 Prices ($)</td><td>Year 3 Prices ($)</td><td>Cost in YEAR ONE (Y1)</td><td>Cost in YEAR TWO (Y2)</td><td>Cost in YEAR THREE (Y3)</td></tr><tr><td>Bread</td><td>50</td><td>1.00</td><td>1.50</td><td>1.20</td><td>$50</td><td></td><td></td></tr><tr><td>Meat</td><td>50</td><td>10.00</td><td>15.00</td><td>10.00</td><td>$500</td><td></td><td></td></tr><tr><td>Milk</td><td>100</td><td>2.00</td><td>3.00</td><td>2.00</td><td>$200</td><td></td><td></td></tr><tr><td>Tank</td><td>1</td><td>1,000,000</td><td>1,000,000</td><td>1,200,000</td><td>$1000000</td><td></td><td></td></tr><tr><td>School</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>Books Medical</td><td>5</td><td>20</td><td>15</td><td>10</td><td>$100</td><td></td><td></td></tr><tr><td>Services</td><td>1</td><td>1,000</td><td>1,500</td><td>1,600</td><td>$1000</td><td></td><td></td></tr><tr><td>Forklift</td><td>1</td><td>50,000</td><td>52,000</td><td>52,000</td><td>$50000</td><td></td><td></td></tr><tr><td>Housing</td><td>12</td><td>1,000</td><td>2,500</td><td>2,500</td><td>$12000</td><td></td><td></td></tr><tr><td colspan=\"5\"></td><td>$13850</td><td></td><td>Cost of Basket</td></tr></table></body></html>",
          "format": null,
          "source": null,
          "ocr_id": "d7557"
        },
        {
          "id": "q20",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "Of the goods and services listed in the table above, which would you include in a typical basket of goods for your household?",
              "format": null,
              "source": null,
              "ocr_id": "i6890"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "type": "text",
          "content": "What is the consumer price index for:",
          "format": null,
          "source": null,
          "ocr_id": "i6676"
        },
        {
          "id": "q21",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "YEAR ONE? 100",
              "format": null,
              "source": null,
              "ocr_id": "d6293"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q22",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "YEAR TWO?",
              "format": null,
              "source": null,
              "ocr_id": "d6293"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q23",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "YEAR THREE?",
              "format": null,
              "source": null,
              "ocr_id": "d6293"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "type": "text",
          "content": "Example: \\( CPI_{Y1}=\\frac{CPI_{Y1}}{CPI_{Base\\,Year}}\\times100 \\) 13850 \\( CPI_{Y1}= x 100 = 100 \\) 13850",
          "format": null,
          "source": null,
          "ocr_id": "l3949"
        },
        {
          "id": "q24",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "What is the YEAR TWO inflation rate?",
              "format": null,
              "source": null,
              "ocr_id": "b5080"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        },
        {
          "id": "q25",
          "type": "short_answer",
          "prompt": [
            {
              "type": "text",
              "content": "What is the YEAR THREE inflation rate?",
              "format": null,
              "source": null,
              "ocr_id": "y1786"
            }
          ],
          "options": null,
          "points": 1.0,
          "required": true,
          "optional": false
        }
      ],
      "points": 10.0,
      "metadata": null
    }
  ]