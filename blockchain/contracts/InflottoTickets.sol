// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract InflottoTickets is ERC721URIStorage {
    using Strings for uint256;

    struct Ticket {
        uint256 draw;
        string index;
        string color;
    }

    address private immutable i_owner;
    uint256 public tokenCounter;
    string private constant COLLECTION_NAME = "Inflotto Tickets B";
    string private constant COLLECTION_ID = "IFLTKB";
    mapping(uint256 => Ticket) public tokenIdToTraits;

    string[] private palette = [
        "#EF5350",
        "#AB47BC",
        "#5C6BC0",
        "#42A5F5",
        "#26A69A",
        "#66BB6A",
        "#FFCA28",
        "#FFA726",
        "#FF7043",
        "#78909C"
    ];

    constructor() ERC721(COLLECTION_NAME, COLLECTION_ID) {
        i_owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == i_owner);
        _;
    }

    function generateTicket(
        string memory draw,
        string memory index,
        string memory color
    ) private returns (string memory) {
        bytes memory path = abi.encodePacked(
            '<g transform="translate(0 871) scale(.1 -.1)" fill="',
            color,
            '">',
            '<path d="m265 8682c-107-37-194-121-235-230-20-52-20-72-20-2047v-1995h684 683l7 95c29 421 206 920 459 1300 175 262 444 549 679 725 555 414 1167 620 1843 620 250 0 398-13 591-51 627-122 1141-394 1585-838 220-220 358-404 502-666 191-349 314-763 340-1145l2-35 658-3 657-2-2 2007-3 2008-28 56c-35 72-110 147-184 185l-58 29-4055 2c-3803 2-4058 1-4105-15zm3740-574c4-4 4-32 1-62l-7-56-41 2c-25 1-43-4-49-13-15-24-10-29 31-29h40v-70-70h-40-40v-150-150h-90-90v150 150h-30-30v70 70h29c26 0 29 3 35 48 12 96 56 124 188 120 47-2 90-6 93-10zm-945-298v-300h-100-100v300 300h100 100v-300zm1150 0v-300h-95-95v300 300h95 95v-300zm840 220v-80h45 45v-70-70h-45-46l3-87 3-88 43 3 42 4v-65c0-75-2-77-113-77-112 0-157 39-157 138 0 27-3 77-6 111-6 56-9 61-30 61-23 0-24 3-24 70s1 70 24 70c21 0 25 6 31 40 7 39 11 43 83 80 43 21 83 39 90 40 8 0 12-22 12-80zm360 0v-80h45 45v-70-70h-45-46l3-87 3-88 36 3c41 4 49-9 49-84 0-49-9-54-113-54-130 0-157 36-157 205v105h-30-30v70 70h30c28 0 30 2 30 40 0 40 0 40 78 79 42 22 83 40 90 41 8 0 12-22 12-80zm-1860-88c60-29 71-67 77-262l6-170h-96-97v131c0 72-5 139-10 150-14 25-42 24-66-2-16-18-19-40-22-150l-4-129h-89-89v220 220h85c80 0 85-1 85-21 0-21 1-21 27-4 57 38 138 45 193 17zm1068 3c102-31 152-101 152-215 0-155-104-241-278-228-165 12-259 151-208 306 40 120 187 180 334 137zm1313-22c74-40 104-95 104-193 0-64-4-82-28-122-40-69-99-100-196-106-93-5-144 8-194 49-60 50-80 98-75 189 3 86 25 129 85 170 82 56 214 62 304 13z"/>',
            '<path d="m4470 7788c-23-38-24-49-9-101 17-63 92-77 117-22 47 103-52 215-108 123z"/>',
            '<path d="m5763 7819c-29-11-43-39-43-89 0-67 24-100 72-100 52 0 82 89 51 149-20 39-48 52-80 40z"/>',
            '<path d="m4305 6793c-708-21-1376-313-1857-811-350-363-569-773-669-1252-26-124-32-181-40-394-9-210-8-268 6-380 57-470 235-899 528-1270 93-119 296-323 417-419 391-314 869-511 1390-572 238-28 579-16 813 30 904 175 1640 779 1971 1619 125 315 191 717 166 1011-35 414-109 688-276 1016-116 228-246 408-439 608-472 488-1108 775-1790 809-77 4-176 6-220 5zm420-378c476-75 899-283 1247-614 213-202 406-488 518-770 78-198 119-373 144-616 14-132 14-173 2-345-16-226-40-353-102-538-259-783-933-1356-1769-1503-174-30-485-37-665-15-422 53-777 191-1095 426-513 379-833 939-894 1560-15 143 2 512 28 640 90 445 294 823 618 1142 128 126 204 189 333 274 334 219 644 327 1080 378 79 9 460-4 555-19z"/>',
            '<path d="m12 2158 3-1873 26-50c40-76 101-138 171-176l63-34h4080 4080l45 23c62 30 154 122 188 185l27 52 3 1873 2 1872h-658-659l-7-80c-28-343-159-761-341-1092-134-243-284-439-499-654-171-171-267-250-446-369-345-229-725-386-1115-460-343-65-705-71-1065-19-512 74-1030 300-1445 630-134 107-354 325-458 455-335 419-550 924-613 1447l-18 142h-683-683l2-1872z"/>',
            "</g>"
        );
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" width="512pt" height="512pt" viewBox="0 0 871 871">',
            "<style>.base { font-family: Tahoma; font-weight: bold; }</style>",
            path,
            '<text font-size="5em" x="50%" y="50%" class="base" fill="#444" dominant-baseline="middle" text-anchor="middle">',
            index,
            "</text>",
            '<text font-size="3.5em" x="50%" y="60%" class="base" fill="#444" dominant-baseline="middle" text-anchor="middle">',
            "YTD",
            "</text>",
            '<text font-size="3em" x="50%" y="92%" class="base" fill="#FFF" dominant-baseline="middle" text-anchor="middle">',
            "DRAW ",
            draw,
            "</text>",
            "</svg>"
        );
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getTraits(uint256 tokenId)
        private
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        return (
            tokenIdToTraits[tokenId].draw.toString(),
            tokenIdToTraits[tokenId].index,
            tokenIdToTraits[tokenId].color
        );
    }

    function getTokenURI(uint256 tokenId) public returns (string memory) {
        (
            string memory draw,
            string memory index,
            string memory color
        ) = getTraits(tokenId);
        bytes memory traits = abi.encodePacked(
            "[",
            '{"trait_type":"Draw", "value":"',
            draw,
            '"},',
            '{"trait_type":"Index", "value":"',
            index,
            '"},',
            '{"trait_type":"Color", "value":"',
            color,
            '"}',
            "]"
        );
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Inflotto Ticket #',
            tokenId.toString(),
            '",',
            '"description": "The Lottery of Inflation",',
            '"image": "',
            generateTicket(draw, index, color),
            '",',
            '"attributes": ',
            traits,
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function mint(
        uint256 newItemId,
        uint256 draw,
        string memory index,
        address owner
    ) public onlyOwner {
        require(!_exists(newItemId), "tokenId already exists");
        tokenCounter = newItemId;
        _safeMint(owner, newItemId);
        tokenIdToTraits[newItemId] = Ticket(draw, index, palette[draw % 10]);
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    // function fusion(uint256 tokenId1, uint256 tokenId2) public {
    // }
}
