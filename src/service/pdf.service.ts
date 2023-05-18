/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import ejs from "ejs";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import { logger } from "../config";
import { Student } from "../models/index";
var moment = require('moment');
const path = require('path');
const appDir = path.resolve(__dirname);
const fs = require('fs');
const puppeteer = require('puppeteer');
//import puppeteer from 'puppeteer';
import 'moment/locale/pt';
class PdfService {

    constructor() { }
    generate = async (student: Student | undefined) => {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        let html = '<table><tr><th>h1</th></tr><tr><td>h2</td></tr></table>';

        const contacts = _.chain(student?.person?.contacts)
            .groupBy("type")
            .map((value, key) => ({ type: key, contacts: value }))
            .value()
        //const template ='student/record'

        const template = 'student/declaration_without_notes'
        try {
            html = await ejs.renderFile(layout, { data: { student, contacts }, template, logo, moment });
        } catch (e: any) {
            html = '<pre>' + JSON.stringify(e.stack, null, 1) + '</pre>';
        }

        await page.setContent(html)
        // page.pdf() is currently supported only in headless mode.
        // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
        const fileName = appDir + '/../../tmp/temp_' + uuid() + '.pdf';
        await page.pdf({
            path: fileName,
            format: 'A4',
            displayHeaderFooter: true,
            headerTemplate: `<div><span class='pageNumber'></span> 
            OF <span class='totalPages'></span></div>`,
            margin: { top: '25px', right: '25px', bottom: '50px', left: '25px' },

        });

        await browser.close();

        return fileName;
    }

}

const layout = path.resolve(
    __dirname + "/../helpers/documents/templates/base.html.ejs"
);


export const logo = `data:image/png;base64,iV
BORw0KGgoAAAANSUhEUgAAAF
kAAABaCAYAAADTn/oBAAAABH
NCSVQICAgIfAhkiAAAABl0RV
h0U29mdHdhcmUAZ25vbWUtc2
NyZWVuc2hvdO8Dvz4AAAAtdE
VYdENyZWF0aW9uIFRpbWUAU3
VuIDA5IEFwciAyMDIzIDEwOj
Q4OjQyIEFNIFdBVPqd2z4AAC
AASURBVHic7Z15fBzFmfe/1T
2HRjO6LMmWbPmQLd/YgDFgLs
c2x5okHBtggUBCkl2SbI4l4c
yGZHMBCSThTSAkb0I4AiRkub
EB2zgxxDc2lg/5kCxbknXfGm
nume5+3j96NJJsydYI2PeT3f
19PvpIXV1dVf3rp5566qmnSs
h/Eepqa+VPf/yTbNy4UUREuj
q75DvfvldERO64/fYT8v/spz
+ViooK6WhvFxGRH/7gB3K46n
Dq/pbNm2Xzpk1SX18vj/3qV0
OeveUzn5VIJCKGYYiIyJNPPC
Gvv/a67Nm9R9avXy+WZaXyBg
PBD/dFh4GDjxiGYbBnzx4KCg
q4/obr+dY999Dr9/PJK66gqa
mJ3/z6N0ydOo2+vj6ys7NTz0
2bNg23201BYSEAN9/8Gd57bz
sulxNN06muPsK1111L5aFKzj
jzTADa29pwulyUlJSQkZEBQC
wWY+PGTTz19FMARKNRdrz3Hl
u2bGH8+AlMmjSRZcuXo5T6yD
jQPqqCg8EgwWCQpqYmvJlepk
2bhqZpfPvee3n8d48DsGz5co
qLi7j0sku599v3Ur6rPPV8KB
QiKysrdV06vZRLL70Up8uF0+
Xkun+6Dq/XS0lJCYerDvPCCy
/wzjvvUF9fz6SSktRzdXV1LF
+xPHWdkZHBE79/ghs//WmuvO
pKjhw9+pESDMBH0T1qa2vlnr
vvlr6+Pjmwf788/dTTQ+5/+Y
tfEsuypLu7W+65624xTVPC4b
C0J1XDB0FXV5fs2rVLRERCoZ
C8sXq1lCevRUSqqqrkV48+Kr
U1NRIMBqWutlZisZjU1NRIIB
D4wPUPh49EkqdNm8bKlZfzzo
YNFBUX89prr3L06FHA7r7nnX
8+SilcLhd33n0XSik8Hg+FSd
XwQTBu3DgWLVoEgK7rnH7GGb
hc7tT9t954k39YuZJgMEhPdz
e6rnPvv3+b5qZmjtUd469/+c
sHbsMJ+DC+VF9fn2zfvl2+cd
ttctedd0kkEpFQMCi3f/Ob0t
fbK3V1dXLb1/9NXn7pJVm9ar
X0+ns/jGrTxu7ycrnzjjukvb
1d4vG4xONx+e6935Hd5eWpPP
XHjkltbe2HWu+HQvJrr70mt3
/TthCefupp6ezsFBGRTRs3yn
fuvVcsyxLTNCUajX4Y1X0gBI
NBKS8vl5/8+Cfi9/vl2k9dI/
F4PHU/FotJNBqVhoYGaWho+F
Dq/EDWRVVVFRMnTuSqq66io7
2DdWvX0trawvr165k1cyaTSk
rIycklEomQmZmJ2+0+daEfMb
xeL2eeeSZnJi2Sy/7hHzAMA6
fTCYDL5QLgwP79hEJhSgYNom
PGWL9OS0uL7C4vl1AoJCIigU
BA/una66Srs0sOHz4sR6qrpa
2t7UORhI8Szc3N8uorr4iISH
V1tYjYdvXmTZukqqpKRESOHD
nygeoYE8ntbW3y3e98V8LhsF
RVVklVVZWYpilHjhyRL3/pSy
ni/15gWZa8/trrcvTIEdnx3g
7ZsWOHVFVVycGDB0VE5Inf/1
4qKirGXL4SEUlX+kPBIDt27G
Tnzh0sXbqUOXPnEggEqKuro6
SkhClTpqDr+gfvZnZfA4kBJh
BHcKKUDxBE4oDrQ7NzI5EID/
/8Yb7179+ipqaGaDRKYWEhbW
1tzJ49G01puNyutMtNy4RrbG
zk2Wee4emnn2b5iuVMLplMe3
sHmR4Pra2tzCybSWlp6Qcg2A
LiIL2I+AeSpRORZsTqAAknE0
2QdpB6sBoRCYyxzgF4PB7+/d
v/jlIKheLQoUMc2L+f008/HV
3X+dWvHuVY3bG0yx01yUePHm
Xrlq1cffXVgKK6upobb/o0Sl
PcfvvtzJo1i6LiorQbMBgiPW
C1gNWOkm5s6VWIhMDyg/QCsW
Ru074WP0gP0P9hDfsDSXxMbd
A0DU3TELEIh8IsW27PFle9/j
o+XxZ54/LSLnPU1oWIsGXLFp
xOB6WlpcycOROApUuXsnTpUn
JyctKuHCyQKKgMQEORAdIIGI
ilUKoYlAeFjkgIhSCSSDYoni
RdENwolZkssg8lnaDcIF7Q8o
H01cmMsjJmlJXR2NjIo488yt
mLF3PrF2+loaEBv9/PlClTRl
3WKUkWEdauWcPlH/84P/v5z9
i2dRuvvfYaH//ExwHGSC7YRP
YAARR5oPJAeRE0lBVEYQJRwJ
MkOoJNlpV8PoGSIKAQlTvQXu
soKIUSN6hMxkIw2BIN8Pbbb3
P11Vdzxpln8IPvfZ+Ozk5mzZ
rJtNJSLr74Ynw+3ynLOiXJ3d
3d1NfX89727cw/7TSWfmwpbW
1tfPUrX+WHP/oh+fn5Y3oJET
9KehAiiPSitExQbpQqBFoBAz
FbUY48BAeK5PistOTzBipJuN
JtNSVWC0r6QByIAqX1O5hMRI
LJATO98eKmm24CYO+evbjcbh
779WOA7QCrrq5O2dsnwyl1cn
5+Pl/68pc5bcECnvnDHzh8+D
DXXnctd91155gJBlBkIcRAQi
irFzErkzdyAXtigLTYSaqAAY
m0m6ykI3mdAWQCgrIagDgQBV
VgqwxMsI6hpB2xOgbUzSjh8X
jweDxUVlZy0803pdJ9Ph/PPf
PsqMoYkeREIsFDDz6I32+P8l
6vl6989ats3bIVpRTTSkvTaq
xtivlTetSW2vEoSQAxmzTLDy
oD0cYBoIjZ1oTqlz410GQxk0
luUC6QIEhfMs2L0qfZ+a0WxG
oHCaKkN5knbauVSy69BIc+tO
N/847bR/XsiCSHw2HOOuss7r
rjTg4dOpRKH40OGg4iEZtkqx
GxOpO1T0C0Emw9m0CsKjtdn5
t8SiUtBxA1nsEkCxFAS+pjB2
I1AwnAAfq8ZJ0dYB5ESQQkjJ
CB0vIYi54uLipm1673icdtq8
WyLHaXl/PG6tVYlnXSZ4edjF
iWxc6dO1l05iIi0Qi//MUvGD
cun+zsbC688AJKp09Ps4kWWM
1J+zeEIoqoaSi9BBAw9tg2L4
B+BmjFiLEXJW2gxoFjMRj7bf
WhzwNtEiTeBkD0RSiVA8YWbD
UxHhyn2xMY4z07DQXaVNBnYe
tk07ZOlJt01y3effddJk2cyE
9+/BMWL17MtNJp6A4H55x9Nr
l5w5t3w5L85ptvsmTJEvLy8p
I2o9DX14fT6SQzMzOtRg0ghp
iHQfyo5AxO9LkobQqQQIztKA
mBygJ9MRABo9wmQj8LrEYw6x
B9HkovhvhfEEC5LkHMJpSV7G
2OZaCciPFe0tYG0aaj9JnYhB
pgHQNRoI0HlX7P/Nwtt/Cd73
6X6dOno2kapmmyd89eFp21aN
j8w37GxoZG6o/V85vf/Ibb/u
02HnrwQcSSMRAskBpo3Chtlj
0gYQIWyjwAZh2go/QzALetg6
2OpDnnST6fsO1dpaGUsictSk
MlVY2SJkBDtNmgdMSsRCXVDN
oUlF6WbE43ktiZVFcRkG7bTk
8TV119NWVlZSkzL5FIsH79+h
HzD0vyDTfewObNm7nwggv4yY
M/4atf+xp/2/i3tBtjTxhaEM
u2ElBulD4b0U8nNfhYVbY+VT
5En2+nmdWIGKCVgBIkaQ/bA6
BK+jJ0RBsPEkpOtb0orRisDp
TViE16WVK/64jZAMb7KIJADJ
EIIgLKmfZrlc0oo7mpGYBAIM
A999zDrFkzR8x/SgdRdXU17+
98nxs/fWOaTRHE6kTRjVgBe6
jRJoIqtLuz1WN3cQlgEzILpU
8Goxqk2SZQm40ydyIqB6WVIm
YFSptqO4akGaWflrSNG0Gbb6
sWYy+2bp4Mjpl2TzAPgbQm26
WBKkC0ySitgLGuJW/ftp09e/
Zw+PBhzjnnHG648YYR856S5H
A4nFqDSw8JMFsAvz0RkAhggP
KCvig5GzMQ8yjKqgfREH0OSi
9CjN0o4qAvTPozmlD6mYh5EL
SS5MeLo/S5iPk+qHyUPgPMPW
D1JQe5UtvnkdhJQ0Mz0ViUmT
MngXYaSp/I4EmJWGF7MpQmIp
EIwCm5OYHkffv2gcCMshl4vd
60Kx6KGGJ1oaQdzDZQA6ZOzF
pBS0sLhYX5xCK1aNKO1wvOjD
mIygfrEIgL9OlgVdnEWa229U
AX4AKcIO0obS5iNaGsZhJWIT
29efi8WSC9tHXEKC0tRYxWlD
7OtqkRsNrAakekC5QPpZ+evP
cBIQLHuV5TJIsI3/ve98jyZQ
HCtq3beOrpp8jJzR2uqDRhgg
QRsxolHbS39zF+0vWpu5ZlYV
kJqqsr8bhbmTrtdJTyIlY1aJ
NR0ovgsa0SlQXiR1Quik4EL4
gG0sDh6hCiJjJjxszUclKqBa
aJrtu6WRnb7UmRcoLKRrR80G
agtEkf6C1Xvf46GzZs4O577m
HixImp9BTJTU1NAEyaZFfU3N
zMtm3buOaaa8ZQXQyRMAoNcI
LyYFmSdK4H2bLpbS5cOny58X
ic1pYj5OTm4/Na6KrPll7pBe
UA5UnOGscDrcQT+VhmK23tBh
OKZqYih47Huxte42MXKsRoIx
yOAoIn04uuZ4NWDPoU0CaTro
5+4P77yczMpLOzk7POWszESR
OZNHESJZMH1gZTJHd32zbluH
HjUjcjkcgYdHG/86cTsfpAIi
h9Pi1tEcSyiMcTlEwuweE4uW
/KNAx279nD4kXTbHIliihX8s
MJIiYKL23t9RQUzkDXT15eW8
te/N3bMVnMrFlzSCSCaFKLyz
MTpbKTlkv6g+Czzz7LNddckz
JvE4kEwUCAvEE8pkrt7e1l06
ZN9Kvorq4utm7dmnalgO2mFB
Mw6erqorOrl+zsbHJyc1EqTm
d71SnL0B0OFi9eTDjqxrLitt
7EiT1gOREU1UcamFA0e1iCE5
ZFwhoYbrJzpjFl+g2MnzAVf2
+EUFgnEClDaflJM25sVsa555
yDaZqp6/0V+6k+cmRInlTrpk
6dyuZNmzhtnm2rLj77bH7xy1
+MqWLBbTdcTLyeTHBm4cm0B9
HMzJmsW7uGlRPnj6qszMwsDM
NtWyfKDikQMbEsHzNnjewFfK
khyPVTBgIYLXGAgMfjSJabiS
BJn3YMhQO0HFIewFFiQlERD9
x/PyUlk7Esi3Xr1vHMs88Mya
NERDZu3AgCFy29iEgkQigU+l
BCpsAeUJWCRMIAwOl0EgwG03
Y0BYO9aJqGx5OJiKBpw6uHuC
X8vqaXVS0h1l40MJB1dNiu0c
LCQgRBoYiGtpHhjCG6z/Z/qI
m2iZkmDMNg4982AsK8+fMpKh
q6DKcBtDS3cMGFF6CUIjMz8w
MRHIvF2L5tO60trezatYtoNE
okEqW9vZ32dtsJNBZPXmZmFm
1tnSiln5Tg777fxs8P9XBNyd
A6CgoKKCgosPPFbE/a+vW76P
abPPX0Njq7c7j//v+TdrsAHA
4Hs2bP4te//jVXfvIKXn3l1S
H3lYjI6lWraWpqIjMzE9M0mD
lzJg6HkyXnLUm/xqSdaEuwYu
vWrcyaNStlc4dCodRLp4u1a9
ay8vKVJ6S3RwzeaQzwt9YIR8
MJDsUsNlxcQpl3oOv3jzVKKd
7ZsIHlK1ZQXr6NiRNLaWyoZ/
HZ59Da2nqCFI4GnZ2d3H/f/X
z845ezfMUK9u7dS6AvwLLly+
w6RUT+889/5up//EcSiQQiws
4dO4lGo6l1vHTQH8zdT/LguY
5SikTCdhgdb8eOBj09PeQd50
6s74vxRl2AI31xct0ax6IW7g
wHvz57/JB8ra32tLqoqIiWlh
aKi4tTbbQsK+Xs6U9LBy+++C
JXXnnlkDC0SCSC2+VG0zU0y7
JwOJy43W58Ph9ZWVmsuHgF51
9wftokAJTv2gVAXW1dqjKlVM
pEdDqdYyIYIDc3FxEwLSEUN9
nbHmFbc5hxGTrz8tw0R0yawg
bXTT5Rr3q93lRv6pfW/RUVwM
CiKZAK8U0H4/LGEQgMjftY9f
rrGKbRX77GVVdfNewLjQWnn3
EGAHv27gFIDgiwZfNmgCG6OV
2EEyb1fTEiCYtQwiScMDm7KJ
O4JRzoiRNICFN9Thbnnzghyc
rKSo0F/asbSg2QG+izSTpcdW
rz8ngsX7GcH/7gBzQ1NbFr1y
6u+dQ15ObmpYIXVX19vbyx+g
2WLl2KO8NNIpHA7XYzPe3Vj6
Fdrb6+nilTptDU1MSkSZPo7O
ykoKAgpZPT9YuEEia72yIUeB
xMznIiQG/MZHNziEp/jK64RV
zgm6fnMztn+OjR/jasWbOGyy
+/fMi9tWvXsnLlytT0O1309v
by0osv0d3dxWWXXZYSNgDl9/
vFsixyc3NT+unFF1/k+uuvP0
mRw6OxsZGSkpIhZA/WzYN/p4
P19QHcGsRNmOZzMDXHRXdUqO
qJUt0boyGUAKX40vw8ir0jO3
lWr1rNFVdeQa/fn/LJdHd1MS
4/n4MHDzJv3rwh+vnDgpaVlU
VOTk7qxTVNIzMzc0xdejh9Vl
1dDUBLi+24r6ysTKvMDY0Btr
eGONaXoDTHSa5LEU0YxC0TSy
T5A5+Y6qPQc3Jd/7FlHwMY4v
Q6ePAgALNmzQJg27ZtabVvNH
A0Nzfz6iuvoGk6iUScRMJgf0
UFV1xxRdqFnX++PVjWHK1hRt
kMANpaW5k1axa7y3czceJEYr
HYyYoYgsZQgicP+ynzOlk+2U
dH2ACXTrHbgRU3sAQcmuIzs3
Mpy8s45Rr04N1UhmHgcDg4/4
ILAFIqYqxB3y+/9BLXXHtt6r
p/qq3rOqq9vV3Kd5UP6EgFCx
YsGFP4Vb8qGKzz+nVc/ywvHX
XxQEUXfeEElxRn0huzKPQ4mO
JzMt7roDtq0h01GZ/poMg7Om
tl3959LDx9IQCvvPwKn7rmU6
l2tbW1MWHChDGpM4DP3vwZzl
2yBK/XS2enHfJw/Q3XM3ny5I
FI+8G7NMeK8l32BpfmpmYREU
kkEieU3dc7uk05PTFDvrajVV
bX9sh9O1rluYNdsqkhIHX+mE
QTpsRMM+327Xp/YKuZlXz+9d
deExGRV199VUTsPSOxWCztst
esWSMiIn97929imqbU1dVJfX
29iIholmnxq0cfPeHrHTxwMO
2vKWKvfPSH0G7auAkYqqv37t
s3qrLaYxY9UYNXa0PoQFGmg4
k+J4a/jd7uTlxjGJyGLNkn33
fpx2w9PWfOHAD8fn8qaiod7K
/Yz0MPPsR727fzs5/+jDffeD
PluE/N+GaUlbHxbxsxTYO/rP
8Ln//CF066ODgc5DgLwjRMdI
c+RH3IKLvjuW8fY1lBJvedkY
9zEKH19fUopexuOAb013/87F
GOm6GmozIOHDjA/PnzR3w3Dc
DtdhMMBFiyZAkrLr6Y11ev4s
KLLkyr8ZZlpRrYL7mabpOzYs
UKwF4+P1XjY6bFt95v5QvTc/
jB6QVDCAYwEkbKyB8L3n3nHW
DAiuju7k7NRsEmN12d/P7O9/
nZT3/KKy+/zLZt2+jr7ePA/g
MDGURE3nrzrbR10PFobGiUxo
ZGSfYMERGprKwUkQGd3K//To
baQFzW1feMeP+N1as/0MYfv9
8vIiJmUieHQ2EJh8JiGIYYhi
FdXV3S1dWVVpl/fv55ERGpqa
mRHz/wgNzymc/Kc889l7qvga
2r+n0N/ajYV5GWrZyTm0NOrm
2RfGzZMmBgqrovqYf700+GyV
4HF5eMbNlkZ4816Lz/eduRry
Wl1ZPpwZPpoaWlhZaWFnRNR9
dGP+MLhUIpZ9PaNWv53Oc/z9
PP/GGoddbP9gv/+Z/y3LPPyT
e/8Q2ZUjJZHvzxT6SluWVs4p
I0JvoluL+nfBgWTDgclkgkMu
bn+7f0hoJBCQWDEg6Hh/ykC8
uyZO2aNal36/X75Ru33TbkXV
Mk/+ynP5N33nlHjh49KiIi0W
g0rW268VhM4oNMn/69y/0NEb
F36NfV1aX9IoNhmmaqq48Fq1
5fJSL2XsT2trZh1UNPz8jq6n
jU1tbKqtdXiWWOLEBD4i5EZM
i83TJNtFE6S/pDCvq7Y7/rb3
D8QT/2V1TgdruZVlqKw+FIa6
AJh+0tZqMNfrQsC6UUu3btIj
s7OzV9TsWBqxMtnlWrVnHllV
eOqvzm5maKi4v5/eOPE4lE+O
KXvkR1dTULFiwYyNTP9pEjR1
LnRIiI7K/YL7d9/d9G/VX7jf
jm5mZpbm5OXXd1dklX5/ADSW
dHp7S3t0tLS0tqQDoV2lpbpa
219ZT5GhoaJBwOS2NDg0RPoV
76enslGAxKMGgfldO/AT8dVB
46JI/88hH5/Oc+J+WDTh0QGa
Quuru7paW5RX7/+ONy7tnnyI
9++CNpa2uTvXv3jqqSfpUwWE
30X2/fvl2efOIJOXDggIhlnx
7Q2NgopmmmThDo7e2VyspKsS
zrpLr7eLU0uH7TNKWjo0P27N
kjIpIq37IsOXjwoBzYf0Asy5
JEPC6VlZUpK+XVV16VxsZGaW
xsHPIup4JhGHLkyBG58YYb5O
tf+7p0dHQMm29ILNyjjz7KRR
dexJy5c0aMxBkJR48eZcaMGa
nraDSKiODJyCAWjxOLxXA6nW
RkZKCUIhAIsOO9HZx99mLi8T
iZXi/hcJhEIoHL6SIej5FfUD
AqmzgQCBAOhRARsnNyCAaDqS
0GPp+PqqoqppdOJzcvl0QiQW
1tLa0t9nKU0+lg0qRJjB9vL1
d5MjOprKxMzQBPhgMHDvDSiy
8yb948Llq6lKKiouEDggYzXr
6rfMggEIvFhpxKdTK8vW7dqL
7+cNiyebM0NzXJmrfeEr/fLz
3d3bJv3z6pqamRWCw2omRZli
WtLa0SCoaku7tb3tv+nhiGIV
u3bpVQMCTvbNiQsnTSwdqkH+
JUGDwIr1u3Tn7w/e/LSy++eE
K+IZIsIlRVVTF79mxisRjfuu
ceVl5+OS6XKzVrGwnRSIQMj4
dAn70DKSs7m6rKKjIy3EyZOj
UlcYFAALEsdIeDgvx8nE5bUn
v8PdTU1FBWVobD4aCvr49gIE
g4EsY0TGbNnpVaPurq6gIBh0
Pn4MFD+LJ8FBUVoZQiGAzS2t
LK3Hlzyc7OTk2VQ8EQwWAATd
cZN25cyrVpGAb79u1j0qRJTJ
gwYdQLCzt37mTL5i1UVx/mpp
tu5vwLzqfmaA3TZwyzonQ868
3NzfLXv/5V6uvr5acPPSQiIs
8///wp9VT/F/X7/bLq9VUjml
nxeDxVVv9pLoN1uIjtvXt73T
rx+/1SV1cn+/bulcd+9ZjU19
fLwQMHZNPGjfK73/5WfvPr34
hhGFJdXS1vr1uXmrX1D7r9bb
Asa0i9o0G/B3E4HDx4MOVx7O
vtlbvuvHOI0XA8TnBl6bpOQU
EBfr8fr9eWnAWnLTjll92VXK
XOycnhiiuvSG1YOXbsGH6/n5
qaGsQS6o8dIxaL2dIVCnHw4E
Fqa2uHxJM5HA4uvewycnJy8P
l8aJrGkvOWYFkWEydNIicnl8
Vnn83yFcsJBALMmDGDSy+9FF
3X6ezs5OiRo1RWVqbWE03TpL
a2llgsRjAYpK6ujngsRmNDw4
jvs32EFRIRYX/Ffs5cZO9Ezc
rO5sGHHjp53OBIX+rpp56W3t
5esUxLgoGAfP6Wz0lTU9OIX2
vXrl1imqb4e/xSV1sn7+98/+
/icJHe3l7p6uqSykOHxO/3Sy
KREMMwUn6Y49He3i6Xr1wpP3
7gAWmoHzijaPv27SPWMeJ2Bh
Ghra2NiooKXE4Xzz//PP/3t/
93xI/V3d2N0+m0R/hBJxX+PS
GRSNCdPMYsPz//pL33hf98ga
v/8WqcTifl5eVkZ2enTk44Hi
MG9W7auJF9+yr42te/xh//+E
cuu+wywJ6tzT/ttBMaMDiu+e
8VTqeTCRMmDHtPRKjYV8Gzzz
yDJRY33XwzTqeT5qam1O7dET
GSiAcCgdSJf1+89YsSCoWksa
FRHvvVY9I6ihnXfzfU1NTIwY
MHJRaNyb69e+WuO++SQ4cOje
rZEddwfD4fPp+P5qZmyspmUL
GvgsqqSr7y1a/Y0eTB4AeWnL
8n7HhvB3PnzsXldrFg4UK+8c
1vcPS4YO+RcMqFss6uTtzuDA
oLC7n44ovp6+vj2Wee5dlnnk
ltsfqfgHg8TnNzc+ra6/VSVj
byBskhOJWo9/X1Ja0MU3p6eu
SmT9806m7y3wmVhw7JjdffIF
u3bpW21lbZuPFv0tk5vK/ieI
z6yLJHfvkIwWCQm2++KTWD+5
+Gw1VV7NixA1AsW75s1IEwoy
Z58HaA/0V6GHXwQmFh4RCC+2
PbRsLx306SiwL96YOvT/adT5
Xv+PTh6jhZO/qxZcuWEXf679
yx4yRvOgqMRT/F43Gprq6WNW
8Nv8r95+f/LGeftVjq6+vlu/
d+R6ZPK5WZZTNTP+9t3y7333
+/TJ5UkkqbM2u2bN26dUg5lm
VJ8YQimVE6XWaWzZRpU6fKJS
sulp7uHtm0aZPMmzM39fzNn7
5JNmzYIEXjJ8jnb/mcJBIJOX
r0aKodFRUVsuiMM4e0Y/u27d
LY2CgXnn+BzJ09R06bN1/mzp
4j27ZtS7Xh6NGjcuu/3Covv/
zyWKgSkTGeOhsMBvnjc89x4Y
UXndRjlYjHeeqpp/j5ww8zb/
68VHppaSl/+etfWb5iBXfdfR
cA9/3oPv743HOcd955Q8rIzc
3l5w8/zOQpk1n/9ts8+cSTtH
e085Uv/ytf+epXUivgXq+Xur
o6cnNz2bZtG8//6U98clDQ5K
3/cisXXnQRt37x1iHteOjBh8
gbl8ezf3wOT0YGjzzyCN+87R
tse287YO9tufSySznzjFOfmj
USxkRyXl4ed9x5J3DySBuH04
nP5+PtdeuoSG4dKC4upqzMPu
TD6XTaU3ARmpuamDy5hEgkQj
weT4XwRqNR3nrrLXJzczl08C
BTpk6lp7ubjo4Odu/eQ2trG2
ATVjq9lKysLD7/hS/wxO+f4K
KlS1Ntqaut5ecP/5zDhw+zu3
w3AF/45y/w3LPPcvc9dzNt2j
QAPvHJT/LkE0+mhCc7O5vrrr
tuLDQN8DDWB0ezTUwpxWurXm
ff3v74N+GB+x/AnTxUdM+e3X
z/P74HwMLTF/LZz36WRx95hH
Xr1lE0oYifP/wwTqeT2bNnM2
HCBCLhMAcOHEiF306fPj3lLy
gcX5jSs5+8zuhrDAAACb1JRE
FU4pMcOHCAN1a/MbRBIkwumY
xpmNxx++2svHwlEyZMwO/vHZ
RnoO0fFj7yf4Hhdrk4++zFqW
uv10tPMqDvggsu5JeP/HJI/g
ULF3L3PfcA9iDlcDg4bcFpTJ
s6lfb2dl5++WV8WVmMHz8epV
Sq7IwMD4cqDyEIiPD1r3+NT/
3jp1Ihweeeey7/8d3/4PEnfk
9hYUGKxIsvuZi33nqTm26+Ca
fTyZNPPsk5557zoXLwkZBcUl
LC8uXL8Xg83HPX3UPunbV4MT
feeCPbt2+naARnzGAsWbKEZ/
+Q3Ear4J//5V+YM2cOz/3pjz
z+u9/xox/+CIDZc+bw8U98nO
XLlpPh8VBUXMwtn/scXZ2deD
wefvLQg/zut7/lvmT+Sy65hP
z8fG6/4w4Mw+TKK64kw+3mrL
PO4r777vtQ+RjT+cmDYQloH/
G/6fj/DSt5TshYXzNtSa7ti1
EdMnihPkgwksBE8U9TfWRn6N
T0JdjYEuKqKT5umP5hHEbyX4
+GUIIf7enAoeCiiT6m+5z8ob
qXrpiJpinmj3OyYryXBXlusp
yjC/wZVpJFwEgmawJBw+RYX4
KKzgjdcZM4ivpwgoQFfQkLzb
TYEjSoDcaRuEWOS8N/0+yTVi
xA1LDss92SaaaAJfbmci0pOZ
oakCKl7NMu7GuViv6xbDWMIF
iisBCQgWdFFILg1BSOU3S7d1
pCrFhbD5rC5XFwfo6T6S6dmK
aY7NKJO2Cyy4FHg4keB2dNyK
Qw046C6n+X4+s4QZJ3t4fpip
p4dMU4t06hx0FXzKC6J8a0LB
fn+Zx4dIUpEIybHOmNc8gfw1
TQbVr4jQS98aHkhRMmu7tj6M
ARfxTDUugaRBIWDqVwawqXrk
AEDYXbofA4NNy6RoZDkaErMh
wKt67hSaa5dJvtqGERMSzCCY
gYJmFDiCQsoqZlH05pChFTiJ
gWDk3h1BSmCMU+JzkuHZ9To2
zQvr/NbXYYmObUWOhzcJbPyf
xcN7Nz3UzJcqWOF+qJmjQGE+
ztjLKkKJNA3KQ7auGPGURMi/
Mn+shx68OTXJDpYHNzmAkeHc
uyv8p4j4PmcJC4JfTETAo9Dq
ZmOynyOQkZQk/MoiBiUOzS8T
tNSFhcsbGRiV4XO1vD5Osa2T
r4dA2vrsjUNTJ0yHRoZCSJ8z
jAo2s4Hba06ZrCodn1OzRFJB
gkasTIyM8jFIkhGU40pxvDVB
gWGJZFwsL+W4RowqQvHCGhu+
gNR0noLmKWEE/mLe+MkjDtvA
kRPA7FgnwPO9sjZLk0XBkOpj
h1xrsdFHmcyY+i0RwyaAol6I
4a9MYtslwaMdOiK2rSGjZoCR
mYIimChyW5MMOB26Hoipq4dZ
X6KfA4eLc1zFSfi9M0jV21vW
RlONnWFmK3P0FzzKTTENAVuJ
38pSvOxN4ExbqGS4FTKRwKHE
qhJ383Vexk9pnnDkrv/7HPZ+
n/W1OwYc2b5Po8XHDBBYT7/K
x58w0+88+34szMwrAEQ8T+bQ
mGBRte+RNl5yxl98YN5E6fTV
tjPTMvviq1788S+xhWS8AUoT
sO65tCODXFRYUeIhb4TYutvT
HKIwaXKtBEcJiCS2BbV4w8Xf
Gp8Vn0RE16kruxumMGl07NGs
LpCSRnODRm5rrY1hLBrZu4dQ
2XQzEzx83qhiD37usc+oACdI
0UG7qtKz2awhMN4XC7cTrdSY
kEKxyk5cg+CPlRRoLY9Fm0Hz
uMz+dlzsJFdlGaQtdtadYV7C
9/H7fLyY5tW+jr7qJofAFHa2
rxZPqIimAIGKZNlmkJCUsoXb
CIfZvWEwiEyDJNqjevp3D2Qv
q6OvAUT0G5vZi6k+5j1Yg3B0
dBsf1vC4J9GA4XIoqo5qDDNO
kNGaztiRE0BVMA06LIqfGVEi
9ep0ZL2EiSbOB2KEqzh4aWDW
tdnFfkZWtziO4YZOgabl3hc2
qcluvG1RQgbg1S7Cr5gyKzYh
OOLB+RqXPxebPQm2twjMsnfq
yDoNNBIhGhafPbJEJ9nHPd5w
kcO8y+t1+hbtdWbrzz+7bk9k
swSYlWiu72VhYsXMgZC+ejWS
a+TA9zF55OQoSEpTAt++X7VY
Upgp7hZfdf13DaymvprK+h7M
JLqdmxEcO06FnzAjllp5E5pY
yatS8wadnV9JVvwjBNYpEI3o
XnEROFVVJGXOxjrxNJySdpEJ
S6NRble+iOWfRETLriJr2Gxc
KCDLJdQ62OYUnOcGicUehhZ3
uUrtiA2sh1aZyRk8GOntgggg
eGf+fud7HmnIlHabiaDuPf/C
Y5t9yJ/731TD7/UhJdbeSXTK
WvpR6HrjP7vOXEejpZdvUN5O
XmoinBoWnoSuHQSUn1yiuuIk
OzBz+XQwFCNCFEDEnqYluvmo
PUheZyc9m/fov8WQuJmkI0Hi
PQ24OlOYieu4KDa/6MpTspPP
cSmre9TfFl13P0hceYeMNtNP
/lRbwXXkFk1ztEZy4inplNQs
TmN2mLnZHlwutQ9ERNumK2mk
hYwnkTToybHnEy0hpO8PiBbs
Zn6Mwf52Z2XgbtUYMHdnfwQk
PYNvFSqkJDD3bjivrJ3Pwazp
Y6ci+6AkdLLSUf+wRuMckvLC
Lbl0WmSyfT6SBDV/aAp9uWRM
YQS0IfYlHYeRVup20dJCwhkh
DbqjCEcNLCSF0nLEKGSciw8w
we8BJCcoAU4iLEEgbRcBDD4a
avs5V4Ik40EqHztd9henOIX/
2vBPKKCPb7oE1hskvnrmk+bp
yVR1/c4rA/ys72CGXZLm6cfe
IZymnP+B6r6OS+/d20Rs1Bel
jD1VFPTriLhMdL3vT5TNQV2b
oiy6Hw6gqvZhOa6bBNw8ykie
ZzKHxOHbdum3FuXUv+ts00p2
arK7dmS7GmIG4KUUNsCTUtYs
m/Y6YQMywiyfSIYZtycUvRFz
eIW7b+DsTtjxEX+/iGhAUxgZ
hlJX8LIUvord5Hb2YugfElxC
xsVWEJny7ycmtpFstKRneWUt
okC3DLpmaePdqbIjipPFG6Ik
dXTNY1Chwa2bqi0KWxqCCDQr
fO3LwM3Loix63j1BQKcOuKDI
eWLPmjmJ/bE5TemIGJzVNf3C
RiCF0xgwM9MY4F4hwOGkQtIW
ZB1LIICvSaQp9AIKnzsSzGu3
TeWTaJedmj30uY9rRaAf80LZ
uX6wOEhZQ+LszQ8Tp15mU6OC
fHyZICD0sKMsh26/bsbFQlfx
SwpT8vY+BVCz0Df39soi2NIr
CjI0x92ODdtjD1UZOmmEUoam
ABKqmTZ/ucTM5Mj7YxO4g2t4
fpS9ibXlBQkunE59CY5nV8ZH
T9VyJoWLTHTFoiBn3GwJrgdK
+DOdnp/V/BD+yF+1+cGh/Zv1
T+Xwzg/wGlFZ3noNwvhgAAAA
BJRU5ErkJggg==`



export default PdfService;