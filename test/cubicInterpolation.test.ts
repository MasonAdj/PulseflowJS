import {
  cubicInterpolate,
  biCubicInterpolate,
  triCubicInterpolate,
  nCubicInterpolate,
} from "../src/cubicInterpolation";
describe("Cubic Interpolation Functions", () => {
  test("cubicInterpolate should correctly identify known values", () => {
    const p = [1, 2, 3, 4];

    const x1 = -1; // p[0]
    const x2 = 0; // p[1]
    const x3 = 1; // p[2]
    const x4 = 2; //p[3]

    const result1 = cubicInterpolate(p, x1);
    const result2 = cubicInterpolate(p, x2);
    const result3 = cubicInterpolate(p, x3);
    const result4 = cubicInterpolate(p, x4);

    expect(result1).toBe(1);
    expect(result2).toBe(2);
    expect(result3).toBe(3);
    expect(result4).toBe(4);
  });
  test("cubicInterpolate should correctly interpolate 1D points", () => {
    const p = [1, 2, 3, 4];
    const x01 = -0.5;
    const x02 = 0.5;
    const x03 = 1.5;
    const result01 = cubicInterpolate(p, x01);
    const result02 = cubicInterpolate(p, x02);
    const result03 = cubicInterpolate(p, x03);

    expect(result01).toBe(1.5);
    expect(result02).toBe(2.5);
    expect(result03).toBe(3.5);
  });

  test("biCubicInterpolate should correctly identify known points", () => {
    const p = [
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
      [4, 5, 6, 7],
    ];
    const x01 = -1;
    const x02 = 0;
    const x03 = 1;
    const x04 = 2;
    const y01 = -1;
    const y02 = 0;
    const y03 = 1;
    const y04 = 2;

    //Row 1
    const result01 = biCubicInterpolate(p, x01, y01);
    const result02 = biCubicInterpolate(p, x01, y02);
    const result03 = biCubicInterpolate(p, x01, y03);
    const result04 = biCubicInterpolate(p, x01, y04);
    //Row 2
    const result05 = biCubicInterpolate(p, x02, y01);
    const result06 = biCubicInterpolate(p, x02, y02);
    const result07 = biCubicInterpolate(p, x02, y03);
    const result08 = biCubicInterpolate(p, x02, y04);
    //Row 3
    const result09 = biCubicInterpolate(p, x03, y01);
    const result10 = biCubicInterpolate(p, x03, y02);
    const result11 = biCubicInterpolate(p, x03, y03);
    const result12 = biCubicInterpolate(p, x03, y04);
    //Row 4
    const result13 = biCubicInterpolate(p, x04, y01);
    const result14 = biCubicInterpolate(p, x04, y02);
    const result15 = biCubicInterpolate(p, x04, y03);
    const result16 = biCubicInterpolate(p, x04, y04);

    expect(result01).toBe(1);
    expect(result02).toBe(2);
    expect(result03).toBe(3);
    expect(result04).toBe(4);

    expect(result05).toBe(2);
    expect(result06).toBe(3);
    expect(result07).toBe(4);
    expect(result08).toBe(5);

    expect(result09).toBe(3);
    expect(result10).toBe(4);
    expect(result11).toBe(5);
    expect(result12).toBe(6);

    expect(result13).toBe(4);
    expect(result14).toBe(5);
    expect(result15).toBe(6);
    expect(result16).toBe(7);
  });
  test("biCubicInterpolate should correctly interpolate 2D points", () => {
    const p = [
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
      [4, 5, 6, 7],
    ];
    const x01 = -1;
    const x02 = 0;
    const x03 = 1;
    const x04 = 2;
    const y01 = -1;
    const y02 = 0;
    const y03 = 1;
    const y04 = 2;

    const Ix01 = -0.5;
    const Ix02 = 0.5;
    const Ix03 = 1.5;
    const Iy01 = -0.5;
    const Iy02 = 0.5;
    const Iy03 = 1.5;

    // X Interpolation
    // Row 1
    const resultX01 = biCubicInterpolate(p, Ix01, y01);
    const resultX02 = biCubicInterpolate(p, Ix01, y02);
    const resultX03 = biCubicInterpolate(p, Ix01, y03);
    const resultX04 = biCubicInterpolate(p, Ix01, y04);
    // Row 2
    const resultX05 = biCubicInterpolate(p, Ix02, y01);
    const resultX06 = biCubicInterpolate(p, Ix02, y02);
    const resultX07 = biCubicInterpolate(p, Ix02, y03);
    const resultX08 = biCubicInterpolate(p, Ix02, y04);

    // Row 3
    const resultX09 = biCubicInterpolate(p, Ix03, y01);
    const resultX10 = biCubicInterpolate(p, Ix03, y02);
    const resultX11 = biCubicInterpolate(p, Ix03, y03);
    const resultX12 = biCubicInterpolate(p, Ix03, y04);

    // Y Interpolation
    // Row 1
    const resultY01 = biCubicInterpolate(p, x01, Iy01);
    const resultY02 = biCubicInterpolate(p, x01, Iy02);
    const resultY03 = biCubicInterpolate(p, x01, Iy03);
    // Row 2
    const resultY04 = biCubicInterpolate(p, x02, Iy01);
    const resultY05 = biCubicInterpolate(p, x02, Iy02);
    const resultY06 = biCubicInterpolate(p, x02, Iy03);
    // Row 3
    const resultY07 = biCubicInterpolate(p, x03, Iy01);
    const resultY08 = biCubicInterpolate(p, x03, Iy02);
    const resultY09 = biCubicInterpolate(p, x03, Iy03);
    // Row 4
    const resultY10 = biCubicInterpolate(p, x04, Iy01);
    const resultY11 = biCubicInterpolate(p, x04, Iy02);
    const resultY12 = biCubicInterpolate(p, x04, Iy03);

    // X Interpolation
    expect(resultX01).toBe(1.5);
    expect(resultX02).toBe(2.5);
    expect(resultX03).toBe(3.5);
    expect(resultX04).toBe(4.5);

    expect(resultX05).toBe(2.5);
    expect(resultX06).toBe(3.5);
    expect(resultX07).toBe(4.5);
    expect(resultX08).toBe(5.5);

    expect(resultX09).toBe(3.5);
    expect(resultX10).toBe(4.5);
    expect(resultX11).toBe(5.5);
    expect(resultX12).toBe(6.5);

    // Y Interpolation
    expect(resultY01).toBe(1.5);
    expect(resultY02).toBe(2.5);
    expect(resultY03).toBe(3.5);

    expect(resultY04).toBe(2.5);
    expect(resultY05).toBe(3.5);
    expect(resultY06).toBe(4.5);

    expect(resultY07).toBe(3.5);
    expect(resultY08).toBe(4.5);
    expect(resultY09).toBe(5.5);

    expect(resultY10).toBe(4.5);
    expect(resultY11).toBe(5.5);
    expect(resultY12).toBe(6.5);
  });

  test("triCubicInterpolate should correctly identify known points", () => {
    const p = [
      [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [4, 5, 6, 7],
      ],
      [
        [5, 6, 7, 8],
        [6, 7, 8, 9],
        [7, 8, 9, 10],
        [8, 9, 10, 11],
      ],
      [
        [9, 10, 11, 12],
        [10, 11, 12, 13],
        [11, 12, 13, 14],
        [12, 13, 14, 15],
      ],
      [
        [13, 14, 15, 16],
        [14, 15, 16, 17],
        [15, 16, 17, 18],
        [16, 17, 18, 19],
      ],
    ];

    const x01 = -1;
    const x02 = 0;
    const x03 = 1;
    const x04 = 2;
    const y01 = -1;
    const y02 = 0;
    const y03 = 1;
    const y04 = 2;
    const z01 = -1;
    const z02 = 0;
    const z03 = 1;
    const z04 = 2;

    //Plane 1
    const result101 = triCubicInterpolate(p, x01, y01, z01);
    const result102 = triCubicInterpolate(p, x01, y02, z01);
    const result103 = triCubicInterpolate(p, x01, y03, z01);
    const result104 = triCubicInterpolate(p, x01, y04, z01);
    const result105 = triCubicInterpolate(p, x01, y01, z02);
    const result106 = triCubicInterpolate(p, x01, y02, z02);
    const result107 = triCubicInterpolate(p, x01, y03, z02);
    const result108 = triCubicInterpolate(p, x01, y04, z02);
    const result109 = triCubicInterpolate(p, x01, y01, z03);
    const result110 = triCubicInterpolate(p, x01, y02, z03);
    const result111 = triCubicInterpolate(p, x01, y03, z03);
    const result112 = triCubicInterpolate(p, x01, y04, z03);
    const result113 = triCubicInterpolate(p, x01, y01, z04);
    const result114 = triCubicInterpolate(p, x01, y02, z04);
    const result115 = triCubicInterpolate(p, x01, y03, z04);
    const result116 = triCubicInterpolate(p, x01, y04, z04);
    //Plane 2
    const result201 = triCubicInterpolate(p, x02, y01, z01);
    const result202 = triCubicInterpolate(p, x02, y02, z01);
    const result203 = triCubicInterpolate(p, x02, y03, z01);
    const result204 = triCubicInterpolate(p, x02, y04, z01);
    const result205 = triCubicInterpolate(p, x02, y01, z02);
    const result206 = triCubicInterpolate(p, x02, y02, z02);
    const result207 = triCubicInterpolate(p, x02, y03, z02);
    const result208 = triCubicInterpolate(p, x02, y04, z02);
    const result209 = triCubicInterpolate(p, x02, y01, z03);
    const result210 = triCubicInterpolate(p, x02, y02, z03);
    const result211 = triCubicInterpolate(p, x02, y03, z03);
    const result212 = triCubicInterpolate(p, x02, y04, z03);
    const result213 = triCubicInterpolate(p, x02, y01, z04);
    const result214 = triCubicInterpolate(p, x02, y02, z04);
    const result215 = triCubicInterpolate(p, x02, y03, z04);
    const result216 = triCubicInterpolate(p, x02, y04, z04);
    //Plane 3
    const result301 = triCubicInterpolate(p, x03, y01, z01);
    const result302 = triCubicInterpolate(p, x03, y02, z01);
    const result303 = triCubicInterpolate(p, x03, y03, z01);
    const result304 = triCubicInterpolate(p, x03, y04, z01);
    const result305 = triCubicInterpolate(p, x03, y01, z02);
    const result306 = triCubicInterpolate(p, x03, y02, z02);
    const result307 = triCubicInterpolate(p, x03, y03, z02);
    const result308 = triCubicInterpolate(p, x03, y04, z02);
    const result309 = triCubicInterpolate(p, x03, y01, z03);
    const result310 = triCubicInterpolate(p, x03, y02, z03);
    const result311 = triCubicInterpolate(p, x03, y03, z03);
    const result312 = triCubicInterpolate(p, x03, y04, z03);
    const result313 = triCubicInterpolate(p, x03, y01, z04);
    const result314 = triCubicInterpolate(p, x03, y02, z04);
    const result315 = triCubicInterpolate(p, x03, y03, z04);
    const result316 = triCubicInterpolate(p, x03, y04, z04);
    //Plane 4
    const result401 = triCubicInterpolate(p, x04, y01, z01);
    const result402 = triCubicInterpolate(p, x04, y02, z01);
    const result403 = triCubicInterpolate(p, x04, y03, z01);
    const result404 = triCubicInterpolate(p, x04, y04, z01);
    const result405 = triCubicInterpolate(p, x04, y01, z02);
    const result406 = triCubicInterpolate(p, x04, y02, z02);
    const result407 = triCubicInterpolate(p, x04, y03, z02);
    const result408 = triCubicInterpolate(p, x04, y04, z02);
    const result409 = triCubicInterpolate(p, x04, y01, z03);
    const result410 = triCubicInterpolate(p, x04, y02, z03);
    const result411 = triCubicInterpolate(p, x04, y03, z03);
    const result412 = triCubicInterpolate(p, x04, y04, z03);
    const result413 = triCubicInterpolate(p, x04, y01, z04);
    const result414 = triCubicInterpolate(p, x04, y02, z04);
    const result415 = triCubicInterpolate(p, x04, y03, z04);
    const result416 = triCubicInterpolate(p, x04, y04, z04);

    //Plane 1
    expect(result101).toBe(1);
    expect(result102).toBe(2);
    expect(result103).toBe(3);
    expect(result104).toBe(4);

    expect(result105).toBe(2);
    expect(result106).toBe(3);
    expect(result107).toBe(4);
    expect(result108).toBe(5);

    expect(result109).toBe(3);
    expect(result110).toBe(4);
    expect(result111).toBe(5);
    expect(result112).toBe(6);

    expect(result113).toBe(4);
    expect(result114).toBe(5);
    expect(result115).toBe(6);
    expect(result116).toBe(7);

    //Plane 2
    expect(result201).toBe(5);
    expect(result202).toBe(6);
    expect(result203).toBe(7);
    expect(result204).toBe(8);

    expect(result205).toBe(6);
    expect(result206).toBe(7);
    expect(result207).toBe(8);
    expect(result208).toBe(9);

    expect(result209).toBe(7);
    expect(result210).toBe(8);
    expect(result211).toBe(9);
    expect(result212).toBe(10);

    expect(result213).toBe(8);
    expect(result214).toBe(9);
    expect(result215).toBe(10);
    expect(result216).toBe(11);

    //Plane 3
    expect(result301).toBe(9);
    expect(result302).toBe(10);
    expect(result303).toBe(11);
    expect(result304).toBe(12);

    expect(result305).toBe(10);
    expect(result306).toBe(11);
    expect(result307).toBe(12);
    expect(result308).toBe(13);

    expect(result309).toBe(11);
    expect(result310).toBe(12);
    expect(result311).toBe(13);
    expect(result312).toBe(14);

    expect(result313).toBe(12);
    expect(result314).toBe(13);
    expect(result315).toBe(14);
    expect(result316).toBe(15);

    //Plane 4
    expect(result401).toBe(13);
    expect(result402).toBe(14);
    expect(result403).toBe(15);
    expect(result404).toBe(16);

    expect(result405).toBe(14);
    expect(result406).toBe(15);
    expect(result407).toBe(16);
    expect(result408).toBe(17);

    expect(result409).toBe(15);
    expect(result410).toBe(16);
    expect(result411).toBe(17);
    expect(result412).toBe(18);

    expect(result413).toBe(16);
    expect(result414).toBe(17);
    expect(result415).toBe(18);
    expect(result416).toBe(19);
  });
  test("triCubicInterpolate should correctly interpolate 3D points", () => {
    const p = [
      [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [4, 5, 6, 7],
      ],
      [
        [5, 6, 7, 8],
        [6, 7, 8, 9],
        [7, 8, 9, 10],
        [8, 9, 10, 11],
      ],
      [
        [9, 10, 11, 12],
        [10, 11, 12, 13],
        [11, 12, 13, 14],
        [12, 13, 14, 15],
      ],
      [
        [13, 14, 15, 16],
        [14, 15, 16, 17],
        [15, 16, 17, 18],
        [16, 17, 18, 19],
      ],
    ];

    const x01 = -1;
    const x02 = 0;
    const x03 = 1;
    const x04 = 2;
    const y01 = -1;
    const y02 = 0;
    const y03 = 1;
    const y04 = 2;
    const z01 = -1;
    const z02 = 0;
    const z03 = 1;
    const z04 = 2;

    const Ix01 = -0.5;
    const Ix02 = 0.5;
    const Ix03 = 1.5;
    const Iy01 = -0.5;
    const Iy02 = 0.5;
    const Iy03 = 1.5;
    const Iz01 = -0.5;
    const Iz02 = 0.5;
    const Iz03 = 1.5;

    // X Interpolation
    // Plane 1
    const resultX101 = triCubicInterpolate(p, Ix01, y01, z01);
    const resultX102 = triCubicInterpolate(p, Ix01, y02, z01);
    const resultX103 = triCubicInterpolate(p, Ix01, y03, z01);
    const resultX104 = triCubicInterpolate(p, Ix01, y04, z01);
    const resultX105 = triCubicInterpolate(p, Ix01, y01, z02);
    const resultX106 = triCubicInterpolate(p, Ix01, y02, z02);
    const resultX107 = triCubicInterpolate(p, Ix01, y03, z02);
    const resultX108 = triCubicInterpolate(p, Ix01, y04, z02);
    const resultX109 = triCubicInterpolate(p, Ix01, y01, z03);
    const resultX110 = triCubicInterpolate(p, Ix01, y02, z03);
    const resultX111 = triCubicInterpolate(p, Ix01, y03, z03);
    const resultX112 = triCubicInterpolate(p, Ix01, y04, z03);
    const resultX113 = triCubicInterpolate(p, Ix01, y01, z04);
    const resultX114 = triCubicInterpolate(p, Ix01, y02, z04);
    const resultX115 = triCubicInterpolate(p, Ix01, y03, z04);
    const resultX116 = triCubicInterpolate(p, Ix01, y04, z04);

    // Plane 2
    const resultX201 = triCubicInterpolate(p, Ix02, y01, z01);
    const resultX202 = triCubicInterpolate(p, Ix02, y02, z01);
    const resultX203 = triCubicInterpolate(p, Ix02, y03, z01);
    const resultX204 = triCubicInterpolate(p, Ix02, y04, z01);
    const resultX205 = triCubicInterpolate(p, Ix02, y01, z02);
    const resultX206 = triCubicInterpolate(p, Ix02, y02, z02);
    const resultX207 = triCubicInterpolate(p, Ix02, y03, z02);
    const resultX208 = triCubicInterpolate(p, Ix02, y04, z02);
    const resultX209 = triCubicInterpolate(p, Ix02, y01, z03);
    const resultX210 = triCubicInterpolate(p, Ix02, y02, z03);
    const resultX211 = triCubicInterpolate(p, Ix02, y03, z03);
    const resultX212 = triCubicInterpolate(p, Ix02, y04, z03);
    const resultX213 = triCubicInterpolate(p, Ix02, y01, z04);
    const resultX214 = triCubicInterpolate(p, Ix02, y02, z04);
    const resultX215 = triCubicInterpolate(p, Ix02, y03, z04);
    const resultX216 = triCubicInterpolate(p, Ix02, y04, z04);

    // Plane 3
    const resultX301 = triCubicInterpolate(p, Ix03, y01, z01);
    const resultX302 = triCubicInterpolate(p, Ix03, y02, z01);
    const resultX303 = triCubicInterpolate(p, Ix03, y03, z01);
    const resultX304 = triCubicInterpolate(p, Ix03, y04, z01);
    const resultX305 = triCubicInterpolate(p, Ix03, y01, z02);
    const resultX306 = triCubicInterpolate(p, Ix03, y02, z02);
    const resultX307 = triCubicInterpolate(p, Ix03, y03, z02);
    const resultX308 = triCubicInterpolate(p, Ix03, y04, z02);
    const resultX309 = triCubicInterpolate(p, Ix03, y01, z03);
    const resultX310 = triCubicInterpolate(p, Ix03, y02, z03);
    const resultX311 = triCubicInterpolate(p, Ix03, y03, z03);
    const resultX312 = triCubicInterpolate(p, Ix03, y04, z03);
    const resultX313 = triCubicInterpolate(p, Ix03, y01, z04);
    const resultX314 = triCubicInterpolate(p, Ix03, y02, z04);
    const resultX315 = triCubicInterpolate(p, Ix03, y03, z04);
    const resultX316 = triCubicInterpolate(p, Ix03, y04, z04);

    // Y Interpolation
    // Plane 1
    const resultY101 = triCubicInterpolate(p, x01, Iy01, z01);
    const resultY102 = triCubicInterpolate(p, x01, Iy02, z01);
    const resultY103 = triCubicInterpolate(p, x01, Iy03, z01);
    const resultY104 = triCubicInterpolate(p, x01, Iy01, z02);
    const resultY105 = triCubicInterpolate(p, x01, Iy02, z02);
    const resultY106 = triCubicInterpolate(p, x01, Iy03, z02);
    const resultY107 = triCubicInterpolate(p, x01, Iy01, z03);
    const resultY108 = triCubicInterpolate(p, x01, Iy02, z03);
    const resultY109 = triCubicInterpolate(p, x01, Iy03, z03);
    const resultY110 = triCubicInterpolate(p, x01, Iy01, z04);
    const resultY111 = triCubicInterpolate(p, x01, Iy02, z04);
    const resultY112 = triCubicInterpolate(p, x01, Iy03, z04);

    // Plane 2
    const resultY201 = triCubicInterpolate(p, x02, Iy01, z01);
    const resultY202 = triCubicInterpolate(p, x02, Iy02, z01);
    const resultY203 = triCubicInterpolate(p, x02, Iy03, z01);
    const resultY204 = triCubicInterpolate(p, x02, Iy01, z02);
    const resultY205 = triCubicInterpolate(p, x02, Iy02, z02);
    const resultY206 = triCubicInterpolate(p, x02, Iy03, z02);
    const resultY207 = triCubicInterpolate(p, x02, Iy01, z03);
    const resultY208 = triCubicInterpolate(p, x02, Iy02, z03);
    const resultY209 = triCubicInterpolate(p, x02, Iy03, z03);
    const resultY210 = triCubicInterpolate(p, x02, Iy01, z04);
    const resultY211 = triCubicInterpolate(p, x02, Iy02, z04);
    const resultY212 = triCubicInterpolate(p, x02, Iy03, z04);
    // Plane 3
    const resultY301 = triCubicInterpolate(p, x03, Iy01, z01);
    const resultY302 = triCubicInterpolate(p, x03, Iy02, z01);
    const resultY303 = triCubicInterpolate(p, x03, Iy03, z01);
    const resultY305 = triCubicInterpolate(p, x03, Iy01, z02);
    const resultY306 = triCubicInterpolate(p, x03, Iy02, z02);
    const resultY307 = triCubicInterpolate(p, x03, Iy03, z02);
    const resultY309 = triCubicInterpolate(p, x03, Iy01, z03);
    const resultY310 = triCubicInterpolate(p, x03, Iy02, z03);
    const resultY311 = triCubicInterpolate(p, x03, Iy03, z03);
    const resultY313 = triCubicInterpolate(p, x03, Iy01, z04);
    const resultY314 = triCubicInterpolate(p, x03, Iy02, z04);
    const resultY315 = triCubicInterpolate(p, x03, Iy03, z04);
    // Plane 4
    const resultY401 = triCubicInterpolate(p, x04, y01, z01);
    const resultY402 = triCubicInterpolate(p, x04, y02, z01);
    const resultY403 = triCubicInterpolate(p, x04, y03, z01);
    const resultY404 = triCubicInterpolate(p, x04, y01, z02);
    const resultY405 = triCubicInterpolate(p, x04, y02, z02);
    const resultY406 = triCubicInterpolate(p, x04, y03, z02);
    const resultY407 = triCubicInterpolate(p, x04, y01, z03);
    const resultY408 = triCubicInterpolate(p, x04, y02, z03);
    const resultY409 = triCubicInterpolate(p, x04, y03, z03);
    const resultY410 = triCubicInterpolate(p, x04, y01, z04);
    const resultY411 = triCubicInterpolate(p, x04, y02, z04);
    const resultY412 = triCubicInterpolate(p, x04, y03, z04);

    // Z Interpolation
    // Plane 1
    const resultZ101 = triCubicInterpolate(p, x01, y01, Iz01);
    const resultZ102 = triCubicInterpolate(p, x01, y02, Iz01);
    const resultZ103 = triCubicInterpolate(p, x01, y03, Iz01);
    const resultZ104 = triCubicInterpolate(p, x01, y04, Iz01);
    const resultZ105 = triCubicInterpolate(p, x01, y01, Iz02);
    const resultZ106 = triCubicInterpolate(p, x01, y02, Iz02);
    const resultZ107 = triCubicInterpolate(p, x01, y03, Iz02);
    const resultZ108 = triCubicInterpolate(p, x01, y04, Iz02);
    const resultZ109 = triCubicInterpolate(p, x01, y01, Iz03);
    const resultZ110 = triCubicInterpolate(p, x01, y02, Iz03);
    const resultZ111 = triCubicInterpolate(p, x01, y03, Iz03);
    const resultZ112 = triCubicInterpolate(p, x01, y04, Iz03);

    //Plane 2
    const resultZ201 = triCubicInterpolate(p, x02, y01, Iz01);
    const resultZ202 = triCubicInterpolate(p, x02, y02, Iz01);
    const resultZ203 = triCubicInterpolate(p, x02, y03, Iz01);
    const resultZ204 = triCubicInterpolate(p, x02, y04, Iz01);
    const resultZ205 = triCubicInterpolate(p, x02, y01, Iz02);
    const resultZ206 = triCubicInterpolate(p, x02, y02, Iz02);
    const resultZ207 = triCubicInterpolate(p, x02, y03, Iz02);
    const resultZ208 = triCubicInterpolate(p, x02, y04, Iz02);
    const resultZ209 = triCubicInterpolate(p, x02, y01, Iz03);
    const resultZ210 = triCubicInterpolate(p, x02, y02, Iz03);
    const resultZ211 = triCubicInterpolate(p, x02, y03, Iz03);
    const resultZ212 = triCubicInterpolate(p, x02, y04, Iz03);

    // Plane 3
    const resultZ301 = triCubicInterpolate(p, x03, y01, Iz01);
    const resultZ302 = triCubicInterpolate(p, x03, y02, Iz01);
    const resultZ303 = triCubicInterpolate(p, x03, y03, Iz01);
    const resultZ304 = triCubicInterpolate(p, x03, y04, Iz01);
    const resultZ305 = triCubicInterpolate(p, x03, y01, Iz02);
    const resultZ306 = triCubicInterpolate(p, x03, y02, Iz02);
    const resultZ307 = triCubicInterpolate(p, x03, y03, Iz02);
    const resultZ308 = triCubicInterpolate(p, x03, y04, Iz02);
    const resultZ309 = triCubicInterpolate(p, x03, y01, Iz03);
    const resultZ310 = triCubicInterpolate(p, x03, y02, Iz03);
    const resultZ311 = triCubicInterpolate(p, x03, y03, Iz03);
    const resultZ312 = triCubicInterpolate(p, x03, y04, Iz03);

    // Plane 4
    const resultZ401 = triCubicInterpolate(p, x04, y01, Iz01);
    const resultZ402 = triCubicInterpolate(p, x04, y02, Iz01);
    const resultZ403 = triCubicInterpolate(p, x04, y03, Iz01);
    const resultZ404 = triCubicInterpolate(p, x04, y04, Iz01);
    const resultZ405 = triCubicInterpolate(p, x04, y01, Iz02);
    const resultZ406 = triCubicInterpolate(p, x04, y02, Iz02);
    const resultZ407 = triCubicInterpolate(p, x04, y03, Iz02);
    const resultZ408 = triCubicInterpolate(p, x04, y04, Iz02);
    const resultZ409 = triCubicInterpolate(p, x04, y01, Iz03);
    const resultZ410 = triCubicInterpolate(p, x04, y02, Iz03);
    const resultZ411 = triCubicInterpolate(p, x04, y03, Iz03);
    const resultZ412 = triCubicInterpolate(p, x04, y04, Iz03);

    //X Interpolation
    //Plane 1
    expect(resultX101).toBe(3);
    expect(resultX102).toBe(4);
    expect(resultX103).toBe(5);
    expect(resultX104).toBe(6);
    expect(resultX105).toBe(4);
    expect(resultX106).toBe(5);
    expect(resultX107).toBe(6);
    expect(resultX108).toBe(7);
    expect(resultX109).toBe(5);
    expect(resultX110).toBe(6);
    expect(resultX111).toBe(7);
    expect(resultX112).toBe(8);
    expect(resultX113).toBe(6);
    expect(resultX114).toBe(7);
    expect(resultX115).toBe(8);
    expect(resultX116).toBe(9);

    //Plane 2
    expect(resultX201).toBe(7);
    expect(resultX202).toBe(8);
    expect(resultX203).toBe(9);
    expect(resultX204).toBe(10);
    expect(resultX205).toBe(8);
    expect(resultX206).toBe(9);
    expect(resultX207).toBe(10);
    expect(resultX208).toBe(11);
    expect(resultX209).toBe(9);
    expect(resultX210).toBe(10);
    expect(resultX211).toBe(11);
    expect(resultX212).toBe(12);
    expect(resultX213).toBe(10);
    expect(resultX214).toBe(11);
    expect(resultX215).toBe(12);
    expect(resultX216).toBe(13);

    //Plane 3
    expect(resultX301).toBe(11);
    expect(resultX302).toBe(12);
    expect(resultX303).toBe(13);
    expect(resultX304).toBe(14);
    expect(resultX305).toBe(12);
    expect(resultX306).toBe(13);
    expect(resultX307).toBe(14);
    expect(resultX308).toBe(15);
    expect(resultX309).toBe(13);
    expect(resultX310).toBe(14);
    expect(resultX311).toBe(15);
    expect(resultX312).toBe(16);
    expect(resultX313).toBe(14);
    expect(resultX314).toBe(15);
    expect(resultX315).toBe(16);
    expect(resultX316).toBe(17);

    //Y Interpolation
    //Plane 1
    expect(resultY101).toBe(1.5);
    expect(resultY102).toBe(2.5);
    expect(resultY103).toBe(3.5);

    expect(resultY104).toBe(2.5);
    expect(resultY105).toBe(3.5);
    expect(resultY106).toBe(4.5);

    expect(resultY107).toBe(3.5);
    expect(resultY108).toBe(4.5);
    expect(resultY109).toBe(5.5);

    expect(resultY110).toBe(4.5);
    expect(resultY111).toBe(5.5);
    expect(resultY112).toBe(6.5);

    //Plane 2
    expect(resultY201).toBe(5.5);
    expect(resultY202).toBe(6.5);
    expect(resultY203).toBe(7.5);

    expect(resultY204).toBe(6.5);
    expect(resultY205).toBe(7.5);
    expect(resultY206).toBe(8.5);

    expect(resultY207).toBe(7.5);
    expect(resultY208).toBe(8.5);
    expect(resultY209).toBe(9.5);

    expect(resultY210).toBe(8.5);
    expect(resultY211).toBe(9.5);
    expect(resultY212).toBe(10.5);

    //Plane 3
    expect(resultY301).toBe(9.5);
    expect(resultY302).toBe(10.5);
    expect(resultY303).toBe(11.5);

    expect(resultY305).toBe(10.5);
    expect(resultY306).toBe(11.5);
    expect(resultY307).toBe(12.5);

    expect(resultY309).toBe(11.5);
    expect(resultY310).toBe(12.5);
    expect(resultY311).toBe(13.5);

    expect(resultY313).toBe(12.5);
    expect(resultY314).toBe(13.5);
    expect(resultY315).toBe(14.5);

    //Plane 4
    expect(resultY401).toBe(13);
    expect(resultY402).toBe(14);
    expect(resultY403).toBe(15);

    expect(resultY404).toBe(14);
    expect(resultY405).toBe(15);
    expect(resultY406).toBe(16);

    expect(resultY407).toBe(15);
    expect(resultY408).toBe(16);
    expect(resultY409).toBe(17);

    expect(resultY410).toBe(16);
    expect(resultY411).toBe(17);
    expect(resultY412).toBe(18);

    //Z Interpolation
    //Plane 1
    expect(resultZ101).toBe(1.5);
    expect(resultZ102).toBe(2.5);
    expect(resultZ103).toBe(3.5);

    expect(resultZ104).toBe(4.5);
    expect(resultZ105).toBe(2.5);
    expect(resultZ106).toBe(3.5);

    expect(resultZ107).toBe(4.5);
    expect(resultZ108).toBe(5.5);
    expect(resultZ109).toBe(3.5);

    expect(resultZ110).toBe(4.5);
    expect(resultZ111).toBe(5.5);
    expect(resultZ112).toBe(6.5);

    //Plane 2
    expect(resultZ201).toBe(5.5);
    expect(resultZ202).toBe(6.5);
    expect(resultZ203).toBe(7.5);

    expect(resultZ204).toBe(8.5);
    expect(resultZ205).toBe(6.5);
    expect(resultZ206).toBe(7.5);

    expect(resultZ207).toBe(8.5);
    expect(resultZ208).toBe(9.5);
    expect(resultZ209).toBe(7.5);

    expect(resultZ210).toBe(8.5);
    expect(resultZ211).toBe(9.5);
    expect(resultZ212).toBe(10.5);

    //Plane 3
    expect(resultZ301).toBe(9.5);
    expect(resultZ302).toBe(10.5);
    expect(resultZ303).toBe(11.5);

    expect(resultZ304).toBe(12.5);
    expect(resultZ307).toBe(12.5);
    expect(resultZ306).toBe(11.5);

    expect(resultZ307).toBe(12.5);
    expect(resultZ308).toBe(13.5);
    expect(resultZ309).toBe(11.5);

    expect(resultZ310).toBe(12.5);
    expect(resultZ311).toBe(13.5);
    expect(resultZ312).toBe(14.5);

    //Plane 4
    expect(resultZ401).toBe(13.5);
    expect(resultZ402).toBe(14.5);
    expect(resultZ403).toBe(15.5);

    expect(resultZ404).toBe(16.5);
    expect(resultZ405).toBe(14.5);
    expect(resultZ406).toBe(15.5);

    expect(resultZ407).toBe(16.5);
    expect(resultZ408).toBe(17.5);
    expect(resultZ409).toBe(15.5);

    expect(resultZ410).toBe(16.5);
    expect(resultZ411).toBe(17.5);
    expect(resultZ412).toBe(18.5);
  });
  test("nCubicInterpolate should correctly identify known 2D points", () => {
    const p = [
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
      [4, 5, 6, 7],
    ];
    const flatP = p.flat(); // Flatten the array for nCubicInterpolate
    const co01 = [-1, -1];
    const co02 = [-1, 0];
    const co03 = [-1, 1];
    const co04 = [-1, 2];
    const co05 = [0, -1];
    const co06 = [0, 0];
    const co07 = [0, 1];
    const co08 = [0, 2];
    const co09 = [1, -1];
    const co10 = [1, 0];
    const co11 = [1, 1];
    const co12 = [1, 2];
    const co13 = [2, -1];
    const co14 = [2, 0];
    const co15 = [2, 1];
    const co16 = [2, 2];

    const result01 = nCubicInterpolate(2, flatP, co01);
    const result02 = nCubicInterpolate(2, flatP, co02);
    const result03 = nCubicInterpolate(2, flatP, co03);
    const result04 = nCubicInterpolate(2, flatP, co04);
    const result05 = nCubicInterpolate(2, flatP, co05);
    const result06 = nCubicInterpolate(2, flatP, co06);
    const result07 = nCubicInterpolate(2, flatP, co07);
    const result08 = nCubicInterpolate(2, flatP, co08);
    const result09 = nCubicInterpolate(2, flatP, co09);
    const result10 = nCubicInterpolate(2, flatP, co10);
    const result11 = nCubicInterpolate(2, flatP, co11);
    const result12 = nCubicInterpolate(2, flatP, co12);
    const result13 = nCubicInterpolate(2, flatP, co13);
    const result14 = nCubicInterpolate(2, flatP, co14);
    const result15 = nCubicInterpolate(2, flatP, co15);
    const result16 = nCubicInterpolate(2, flatP, co16);

    expect(result01).toBe(1);
    expect(result02).toBe(2);
    expect(result03).toBe(3);
    expect(result04).toBe(4);
    expect(result05).toBe(2);
    expect(result06).toBe(3);
    expect(result07).toBe(4);
    expect(result08).toBe(5);
    expect(result09).toBe(3);
    expect(result10).toBe(4);
    expect(result11).toBe(5);
    expect(result12).toBe(6);
    expect(result13).toBe(4);
    expect(result14).toBe(5);
    expect(result15).toBe(6);
    expect(result16).toBe(7);
  });
  test("nCubicInterpolate should correctly interpolate 2D points", () => {
    const p = [
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
      [4, 5, 6, 7],
    ];
    const flatP = p.flat(); // Flatten the array for nCubicInterpolate

    // X Interpolation
    const coX01 = [-0.5, -1];
    const coX02 = [-0.5, 0];
    const coX03 = [-0.5, 1];
    const coX04 = [-0.5, 2];
    const coX05 = [0.5, -1];
    const coX06 = [0.5, 0];
    const coX07 = [0.5, 1];
    const coX08 = [0.5, 2];
    const coX09 = [1.5, -1];
    const coX10 = [1.5, 0];
    const coX11 = [1.5, 1];
    const coX12 = [1.5, 2];

    const resultX01 = nCubicInterpolate(2, flatP, coX01);
    const resultX02 = nCubicInterpolate(2, flatP, coX02);
    const resultX03 = nCubicInterpolate(2, flatP, coX03);
    const resultX04 = nCubicInterpolate(2, flatP, coX04);
    const resultX05 = nCubicInterpolate(2, flatP, coX05);
    const resultX06 = nCubicInterpolate(2, flatP, coX06);
    const resultX07 = nCubicInterpolate(2, flatP, coX07);
    const resultX08 = nCubicInterpolate(2, flatP, coX08);
    const resultX09 = nCubicInterpolate(2, flatP, coX09);
    const resultX10 = nCubicInterpolate(2, flatP, coX10);
    const resultX11 = nCubicInterpolate(2, flatP, coX11);
    const resultX12 = nCubicInterpolate(2, flatP, coX12);

    // Y Interpolation
    const coY01 = [-1, -0.5];
    const coY02 = [-1, 0.5];
    const coY03 = [-1, 1.5];
    const coY04 = [0, -0.5];
    const coY05 = [0, 0.5];
    const coY06 = [0, 1.5];
    const coY07 = [1, -1.5];
    const coY08 = [1, 0.5];
    const coY09 = [1, 1.5];
    const coY10 = [2, -1.5];
    const coY11 = [2, 0.5];
    const coY12 = [2, 1.5];

    const resultY01 = nCubicInterpolate(2, flatP, coY01);
    const resultY02 = nCubicInterpolate(2, flatP, coY02);
    const resultY03 = nCubicInterpolate(2, flatP, coY03);
    const resultY04 = nCubicInterpolate(2, flatP, coY04);
    const resultY05 = nCubicInterpolate(2, flatP, coY05);
    const resultY06 = nCubicInterpolate(2, flatP, coY06);
    const resultY07 = nCubicInterpolate(2, flatP, coY07);
    const resultY08 = nCubicInterpolate(2, flatP, coY08);
    const resultY09 = nCubicInterpolate(2, flatP, coY09);
    const resultY10 = nCubicInterpolate(2, flatP, coY10);
    const resultY11 = nCubicInterpolate(2, flatP, coY11);
    const resultY12 = nCubicInterpolate(2, flatP, coY12);

    // X Interpolation
    expect(resultX01).toBe(1.5);
    expect(resultX02).toBe(2.5);
    expect(resultX03).toBe(3.5);
    expect(resultX04).toBe(4.5);
    expect(resultX05).toBe(2.5);
    expect(resultX06).toBe(3.5);
    expect(resultX07).toBe(4.5);
    expect(resultX08).toBe(5.5);
    expect(resultX09).toBe(3.5);
    expect(resultX10).toBe(4.5);
    expect(resultX11).toBe(5.5);
    expect(resultX12).toBe(6.5);

    // Y Interpolation
    expect(resultY01).toBe(1.5);
    expect(resultY02).toBe(2.5);
    expect(resultY03).toBe(3.5);
    expect(resultY04).toBe(2.5);
    expect(resultY05).toBe(3.5);
    expect(resultY06).toBe(4.5);
    expect(resultY07).toBe(2.5);
    expect(resultY08).toBe(4.5);
    expect(resultY09).toBe(5.5);
    expect(resultY10).toBe(3.5);
    expect(resultY11).toBe(5.5);
    expect(resultY12).toBe(6.5);
  });
  test("nCubicInterpolate should correctly identify known 3D points", () => {
    const p = [
      [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [4, 5, 6, 7],
      ],
      [
        [5, 6, 7, 8],
        [6, 7, 8, 9],
        [7, 8, 9, 10],
        [8, 9, 10, 11],
      ],
      [
        [9, 10, 11, 12],
        [10, 11, 12, 13],
        [11, 12, 13, 14],
        [12, 13, 14, 15],
      ],
      [
        [13, 14, 15, 16],
        [14, 15, 16, 17],
        [15, 16, 17, 18],
        [16, 17, 18, 19],
      ],
    ];
    const flatP = p.flat(2); // Flatten the 3D array for nCubicInterpolate

    const co101 = [-1, -1, -1];
    const co102 = [-1, 0, -1];
    const co103 = [-1, 1, -1];
    const co104 = [-1, 2, -1];
    const co105 = [-1, -1, 0];
    const co106 = [-1, 0, 0];
    const co107 = [-1, 1, 0];
    const co108 = [-1, 2, 0];
    const co109 = [-1, -1, 1];
    const co110 = [-1, 0, 1];
    const co111 = [-1, 1, 1];
    const co112 = [-1, 2, 1];
    const co113 = [-1, -1, 2];
    const co114 = [-1, 0, 2];
    const co115 = [-1, 1, 2];
    const co116 = [-1, 2, 2];

    const co201 = [0, -1, -1];
    const co202 = [0, 0, -1];
    const co203 = [0, 1, -1];
    const co204 = [0, 2, -1];
    const co205 = [0, -1, 0];
    const co206 = [0, 0, 0];
    const co207 = [0, 1, 0];
    const co208 = [0, 2, 0];
    const co209 = [0, -1, 1];
    const co210 = [0, 0, 1];
    const co211 = [0, 1, 1];
    const co212 = [0, 2, 1];
    const co213 = [0, -1, 2];
    const co214 = [0, 0, 2];
    const co215 = [0, 1, 2];
    const co216 = [0, 2, 2];

    const co301 = [1, -1, -1];
    const co302 = [1, 0, -1];
    const co303 = [1, 1, -1];
    const co304 = [1, 2, -1];
    const co305 = [1, -1, 0];
    const co306 = [1, 0, 0];
    const co307 = [1, 1, 0];
    const co308 = [1, 2, 0];
    const co309 = [1, -1, 1];
    const co310 = [1, 0, 1];
    const co311 = [1, 1, 1];
    const co312 = [1, 2, 1];
    const co313 = [1, -1, 2];
    const co314 = [1, 0, 2];
    const co315 = [1, 1, 2];
    const co316 = [1, 2, 2];

    const co401 = [2, -1, -1];
    const co402 = [2, 0, -1];
    const co403 = [2, 1, -1];
    const co404 = [2, 2, -1];
    const co405 = [2, -1, 0];
    const co406 = [2, 0, 0];
    const co407 = [2, 1, 0];
    const co408 = [2, 2, 0];
    const co409 = [2, -1, 1];
    const co410 = [2, 0, 1];
    const co411 = [2, 1, 1];
    const co412 = [2, 2, 1];
    const co413 = [2, -1, 2];
    const co414 = [2, 0, 2];
    const co415 = [2, 1, 2];
    const co416 = [2, 2, 2];

    const result101 = nCubicInterpolate(3, flatP, co101);
    const result102 = nCubicInterpolate(3, flatP, co102);
    const result103 = nCubicInterpolate(3, flatP, co103);
    const result104 = nCubicInterpolate(3, flatP, co104);
    const result105 = nCubicInterpolate(3, flatP, co105);
    const result106 = nCubicInterpolate(3, flatP, co106);
    const result107 = nCubicInterpolate(3, flatP, co107);
    const result108 = nCubicInterpolate(3, flatP, co108);
    const result109 = nCubicInterpolate(3, flatP, co109);
    const result110 = nCubicInterpolate(3, flatP, co110);
    const result111 = nCubicInterpolate(3, flatP, co111);
    const result112 = nCubicInterpolate(3, flatP, co112);
    const result113 = nCubicInterpolate(3, flatP, co113);
    const result114 = nCubicInterpolate(3, flatP, co114);
    const result115 = nCubicInterpolate(3, flatP, co115);
    const result116 = nCubicInterpolate(3, flatP, co116);

    const result201 = nCubicInterpolate(3, flatP, co201);
    const result202 = nCubicInterpolate(3, flatP, co202);
    const result203 = nCubicInterpolate(3, flatP, co203);
    const result204 = nCubicInterpolate(3, flatP, co204);
    const result205 = nCubicInterpolate(3, flatP, co205);
    const result206 = nCubicInterpolate(3, flatP, co206);
    const result207 = nCubicInterpolate(3, flatP, co207);
    const result208 = nCubicInterpolate(3, flatP, co208);
    const result209 = nCubicInterpolate(3, flatP, co209);
    const result210 = nCubicInterpolate(3, flatP, co210);
    const result211 = nCubicInterpolate(3, flatP, co211);
    const result212 = nCubicInterpolate(3, flatP, co212);
    const result213 = nCubicInterpolate(3, flatP, co213);
    const result214 = nCubicInterpolate(3, flatP, co214);
    const result215 = nCubicInterpolate(3, flatP, co215);
    const result216 = nCubicInterpolate(3, flatP, co216);

    const result301 = nCubicInterpolate(3, flatP, co301);
    const result302 = nCubicInterpolate(3, flatP, co302);
    const result303 = nCubicInterpolate(3, flatP, co303);
    const result304 = nCubicInterpolate(3, flatP, co304);
    const result305 = nCubicInterpolate(3, flatP, co305);
    const result306 = nCubicInterpolate(3, flatP, co306);
    const result307 = nCubicInterpolate(3, flatP, co307);
    const result308 = nCubicInterpolate(3, flatP, co308);
    const result309 = nCubicInterpolate(3, flatP, co309);
    const result310 = nCubicInterpolate(3, flatP, co310);
    const result311 = nCubicInterpolate(3, flatP, co311);
    const result312 = nCubicInterpolate(3, flatP, co312);
    const result313 = nCubicInterpolate(3, flatP, co313);
    const result314 = nCubicInterpolate(3, flatP, co314);
    const result315 = nCubicInterpolate(3, flatP, co315);
    const result316 = nCubicInterpolate(3, flatP, co316);

    const result401 = nCubicInterpolate(3, flatP, co401);
    const result402 = nCubicInterpolate(3, flatP, co402);
    const result403 = nCubicInterpolate(3, flatP, co403);
    const result404 = nCubicInterpolate(3, flatP, co404);
    const result405 = nCubicInterpolate(3, flatP, co405);
    const result406 = nCubicInterpolate(3, flatP, co406);
    const result407 = nCubicInterpolate(3, flatP, co407);
    const result408 = nCubicInterpolate(3, flatP, co408);
    const result409 = nCubicInterpolate(3, flatP, co409);
    const result410 = nCubicInterpolate(3, flatP, co410);
    const result411 = nCubicInterpolate(3, flatP, co411);
    const result412 = nCubicInterpolate(3, flatP, co412);
    const result413 = nCubicInterpolate(3, flatP, co413);
    const result414 = nCubicInterpolate(3, flatP, co414);
    const result415 = nCubicInterpolate(3, flatP, co415);
    const result416 = nCubicInterpolate(3, flatP, co416);

    expect(result101).toBe(1);
    expect(result102).toBe(2);
    expect(result103).toBe(3);
    expect(result104).toBe(4);
    expect(result105).toBe(2);
    expect(result106).toBe(3);
    expect(result107).toBe(4);
    expect(result108).toBe(5);
    expect(result109).toBe(3);
    expect(result110).toBe(4);
    expect(result111).toBe(5);
    expect(result112).toBe(6);
    expect(result113).toBe(4);
    expect(result114).toBe(5);
    expect(result115).toBe(6);
    expect(result116).toBe(7);

    expect(result201).toBe(5);
    expect(result202).toBe(6);
    expect(result203).toBe(7);
    expect(result204).toBe(8);
    expect(result205).toBe(6);
    expect(result206).toBe(7);
    expect(result207).toBe(8);
    expect(result208).toBe(9);
    expect(result209).toBe(7);
    expect(result210).toBe(8);
    expect(result211).toBe(9);
    expect(result212).toBe(10);
    expect(result213).toBe(8);
    expect(result214).toBe(9);
    expect(result215).toBe(10);
    expect(result216).toBe(11);

    expect(result301).toBe(9);
    expect(result302).toBe(10);
    expect(result303).toBe(11);
    expect(result304).toBe(12);
    expect(result305).toBe(10);
    expect(result306).toBe(11);
    expect(result307).toBe(12);
    expect(result308).toBe(13);
    expect(result309).toBe(11);
    expect(result310).toBe(12);
    expect(result311).toBe(13);
    expect(result312).toBe(14);
    expect(result313).toBe(12);
    expect(result314).toBe(13);
    expect(result315).toBe(14);
    expect(result316).toBe(15);

    expect(result401).toBe(13);
    expect(result402).toBe(14);
    expect(result403).toBe(15);
    expect(result404).toBe(16);
    expect(result405).toBe(14);
    expect(result406).toBe(15);
    expect(result407).toBe(16);
    expect(result408).toBe(17);
    expect(result409).toBe(15);
    expect(result410).toBe(16);
    expect(result411).toBe(17);
    expect(result412).toBe(18);
    expect(result413).toBe(16);
    expect(result414).toBe(17);
    expect(result415).toBe(18);
    expect(result416).toBe(19);
  });
  test("nCubicInterpolate should correctly interpolate 3D points", () => {
    const p = [
      [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [4, 5, 6, 7],
      ],
      [
        [5, 6, 7, 8],
        [6, 7, 8, 9],
        [7, 8, 9, 10],
        [8, 9, 10, 11],
      ],
      [
        [9, 10, 11, 12],
        [10, 11, 12, 13],
        [11, 12, 13, 14],
        [12, 13, 14, 15],
      ],
      [
        [13, 14, 15, 16],
        [14, 15, 16, 17],
        [15, 16, 17, 18],
        [16, 17, 18, 19],
      ],
    ];
    const flatP = p.flat(2); // Flatten the 3D array for nCubicInterpolate

    const coX101 = [-0.5, -1, -1];
    const coX102 = [-0.5, 0, -1];
    const coX103 = [-0.5, 1, -1];
    const coX104 = [-0.5, 2, -1];
    const coX105 = [-0.5, -1, 0];
    const coX106 = [-0.5, 0, 0];
    const coX107 = [-0.5, 1, 0];
    const coX108 = [-0.5, 2, 0];
    const coX109 = [-0.5, -1, 1];
    const coX110 = [-0.5, 0, 1];
    const coX111 = [-0.5, 1, 1];
    const coX112 = [-0.5, 2, 1];
    const coX113 = [-0.5, -1, 2];
    const coX114 = [-0.5, 0, 2];
    const coX115 = [-0.5, 1, 2];
    const coX116 = [-0.5, 2, 2];

    const coX201 = [0.5, -1, -1];
    const coX202 = [0.5, 0, -1];
    const coX203 = [0.5, 1, -1];
    const coX204 = [0.5, 2, -1];
    const coX205 = [0.5, -1, 0];
    const coX206 = [0.5, 0, 0];
    const coX207 = [0.5, 1, 0];
    const coX208 = [0.5, 2, 0];
    const coX209 = [0.5, -1, 1];
    const coX210 = [0.5, 0, 1];
    const coX211 = [0.5, 1, 1];
    const coX212 = [0.5, 2, 1];
    const coX213 = [0.5, -1, 2];
    const coX214 = [0.5, 0, 2];
    const coX215 = [0.5, 1, 2];
    const coX216 = [0.5, 2, 2];

    const coX301 = [1.5, -1, -1];
    const coX302 = [1.5, 0, -1];
    const coX303 = [1.5, 1, -1];
    const coX304 = [1.5, 2, -1];
    const coX305 = [1.5, -1, 0];
    const coX306 = [1.5, 0, 0];
    const coX307 = [1.5, 1, 0];
    const coX308 = [1.5, 2, 0];
    const coX309 = [1.5, -1, 1];
    const coX310 = [1.5, 0, 1];
    const coX311 = [1.5, 1, 1];
    const coX312 = [1.5, 2, 1];
    const coX313 = [1.5, -1, 2];
    const coX314 = [1.5, 0, 2];
    const coX315 = [1.5, 1, 2];
    const coX316 = [1.5, 2, 2];

    const coY101 = [-1, -0.5, -1];
    const coY102 = [-1, 0.5, -1];
    const coY103 = [-1, 1.5, -1];
    const coY104 = [-1, -0.5, 0];
    const coY105 = [-1, 0.5, 0];
    const coY106 = [-1, 1.5, 0];
    const coY107 = [-1, -0.5, 1];
    const coY108 = [-1, 0.5, 1];
    const coY109 = [-1, 1.5, 1];
    const coY110 = [-1, -0.5, 2];
    const coY111 = [-1, 0.5, 2];
    const coY112 = [-1, 1.5, 2];

    const coY201 = [0, -0.5, -1];
    const coY202 = [0, 0, -1];
    const coY203 = [0, 1.5, -1];
    const coY204 = [0, -0.5, 0];
    const coY205 = [0, 0.5, 0];
    const coY206 = [0, 1.5, 0];
    const coY207 = [0, -0.5, 1];
    const coY208 = [0, 0.5, 1];
    const coY209 = [0, 1.5, 1];
    const coY210 = [0, -0.5, 2];
    const coY211 = [0, 0.5, 2];
    const coY212 = [0, 1.5, 2];

    const coY301 = [1, -0.5, -1];
    const coY302 = [1, 0.5, -1];
    const coY303 = [1, 1, -1];
    const coY304 = [1, -0.5, 0];
    const coY305 = [1, 0.5, 0];
    const coY306 = [1, 1.5, 0];
    const coY307 = [1, -0.5, 1];
    const coY308 = [1, 0.5, 1];
    const coY309 = [1, 1.5, 1];
    const coY310 = [1, -0.5, 2];
    const coY311 = [1, 0.5, 2];
    const coY312 = [1, 1.5, 2];

    const coY401 = [2, -0.5, -1];
    const coY402 = [2, 0.5, -1];
    const coY403 = [2, 1.5, -1];
    const coY404 = [2, -0.5, 0];
    const coY405 = [2, 0.5, 0];
    const coY406 = [2, 1.5, 0];
    const coY407 = [2, -0.5, 1];
    const coY408 = [2, 0.5, 1];
    const coY409 = [2, 1.5, 1];
    const coY410 = [2, -0.5, 2];
    const coY411 = [2, 0.5, 2];
    const coY412 = [2, 1.5, 2];

    const coZ101 = [-1, -1, -1];
    const coZ102 = [-1, 0, -1];
    const coZ103 = [-1, 1, -1];
    const coZ104 = [-1, 2, -1];
    const coZ105 = [-1, -1, 0];
    const coZ106 = [-1, 0, 0];
    const coZ107 = [-1, 1, 0];
    const coZ108 = [-1, 2, 0];
    const coZ109 = [-1, -1, 1];
    const coZ110 = [-1, 0, 1];
    const coZ111 = [-1, 1, 1];
    const coZ112 = [-1, 2, 1];

    const coZ201 = [0, -1, -0.5];
    const coZ202 = [0, 0, -0.5];
    const coZ203 = [0, 1, -0.5];
    const coZ204 = [0, 2, -0.5];
    const coZ205 = [0, -1, 0.5];
    const coZ206 = [0, 0, 0.5];
    const coZ207 = [0, 1, 0.5];
    const coZ208 = [0, 2, 0.5];
    const coZ209 = [0, -1, 1.5];
    const coZ210 = [0, 0, 1.5];
    const coZ211 = [0, 1, 1.5];
    const coZ212 = [0, 2, 1.5];

    const coZ301 = [1, -1, -0.5];
    const coZ302 = [1, 0, -0.5];
    const coZ303 = [1, 1, -0.5];
    const coZ304 = [1, 2, -0.5];
    const coZ305 = [1, -1, 0.5];
    const coZ306 = [1, 0, 0.5];
    const coZ307 = [1, 1, 0.5];
    const coZ308 = [1, 2, 0.5];
    const coZ309 = [1, -1, 1.5];
    const coZ310 = [1, 0, 1.5];
    const coZ311 = [1, 1, 1.5];
    const coZ312 = [1, 2, 1.5];

    const coZ401 = [2, -1, -0.5];
    const coZ402 = [2, 0, -0.5];
    const coZ403 = [2, 1, -0.5];
    const coZ404 = [2, 2, -0.5];
    const coZ405 = [2, -1, 0.5];
    const coZ406 = [2, 0, 0.5];
    const coZ407 = [2, 1, 0.5];
    const coZ408 = [2, 2, 0.5];
    const coZ409 = [2, -1, 1.5];
    const coZ410 = [2, 0, 1.5];
    const coZ411 = [2, 1, 1.5];
    const coZ412 = [2, 2, 1.5];

    // X Interpolation
    const resultX101 = nCubicInterpolate(3, flatP, coX101);
    const resultX102 = nCubicInterpolate(3, flatP, coX102);
    const resultX103 = nCubicInterpolate(3, flatP, coX103);
    const resultX104 = nCubicInterpolate(3, flatP, coX104);
    const resultX105 = nCubicInterpolate(3, flatP, coX105);
    const resultX106 = nCubicInterpolate(3, flatP, coX106);
    const resultX107 = nCubicInterpolate(3, flatP, coX107);
    const resultX108 = nCubicInterpolate(3, flatP, coX108);
    const resultX109 = nCubicInterpolate(3, flatP, coX109);
    const resultX110 = nCubicInterpolate(3, flatP, coX110);
    const resultX111 = nCubicInterpolate(3, flatP, coX111);
    const resultX112 = nCubicInterpolate(3, flatP, coX112);
    const resultX113 = nCubicInterpolate(3, flatP, coX113);
    const resultX114 = nCubicInterpolate(3, flatP, coX114);
    const resultX115 = nCubicInterpolate(3, flatP, coX115);
    const resultX116 = nCubicInterpolate(3, flatP, coX116);

    const resultX201 = nCubicInterpolate(3, flatP, coX201);
    const resultX202 = nCubicInterpolate(3, flatP, coX202);
    const resultX203 = nCubicInterpolate(3, flatP, coX203);
    const resultX204 = nCubicInterpolate(3, flatP, coX204);
    const resultX205 = nCubicInterpolate(3, flatP, coX205);
    const resultX206 = nCubicInterpolate(3, flatP, coX206);
    const resultX207 = nCubicInterpolate(3, flatP, coX207);
    const resultX208 = nCubicInterpolate(3, flatP, coX208);
    const resultX209 = nCubicInterpolate(3, flatP, coX209);
    const resultX210 = nCubicInterpolate(3, flatP, coX210);
    const resultX211 = nCubicInterpolate(3, flatP, coX211);
    const resultX212 = nCubicInterpolate(3, flatP, coX212);
    const resultX213 = nCubicInterpolate(3, flatP, coX213);
    const resultX214 = nCubicInterpolate(3, flatP, coX214);
    const resultX215 = nCubicInterpolate(3, flatP, coX215);
    const resultX216 = nCubicInterpolate(3, flatP, coX216);

    const resultX301 = nCubicInterpolate(3, flatP, coX301);
    const resultX302 = nCubicInterpolate(3, flatP, coX302);
    const resultX303 = nCubicInterpolate(3, flatP, coX303);
    const resultX304 = nCubicInterpolate(3, flatP, coX304);
    const resultX305 = nCubicInterpolate(3, flatP, coX305);
    const resultX306 = nCubicInterpolate(3, flatP, coX306);
    const resultX307 = nCubicInterpolate(3, flatP, coX307);
    const resultX308 = nCubicInterpolate(3, flatP, coX308);
    const resultX309 = nCubicInterpolate(3, flatP, coX309);
    const resultX310 = nCubicInterpolate(3, flatP, coX310);
    const resultX311 = nCubicInterpolate(3, flatP, coX311);
    const resultX312 = nCubicInterpolate(3, flatP, coX312);
    const resultX313 = nCubicInterpolate(3, flatP, coX313);
    const resultX314 = nCubicInterpolate(3, flatP, coX314);
    const resultX315 = nCubicInterpolate(3, flatP, coX315);
    const resultX316 = nCubicInterpolate(3, flatP, coX316);

    expect(resultX101).toBe(3);
    expect(resultX102).toBe(4);
    expect(resultX103).toBe(5);
    expect(resultX104).toBe(6);
    expect(resultX105).toBe(4);
    expect(resultX106).toBe(5);
    expect(resultX107).toBe(6);
    expect(resultX108).toBe(7);
    expect(resultX109).toBe(5);
    expect(resultX110).toBe(6);
    expect(resultX111).toBe(7);
    expect(resultX112).toBe(8);
    expect(resultX113).toBe(6);
    expect(resultX114).toBe(7);
    expect(resultX115).toBe(8);
    expect(resultX116).toBe(9);

    expect(resultX201).toBe(7);
    expect(resultX202).toBe(8);
    expect(resultX203).toBe(9);
    expect(resultX204).toBe(10);
    expect(resultX205).toBe(8);
    expect(resultX206).toBe(9);
    expect(resultX207).toBe(10);
    expect(resultX208).toBe(11);
    expect(resultX209).toBe(9);
    expect(resultX210).toBe(10);
    expect(resultX211).toBe(11);
    expect(resultX212).toBe(12);
    expect(resultX213).toBe(10);
    expect(resultX214).toBe(11);
    expect(resultX215).toBe(12);
    expect(resultX216).toBe(13);

    expect(resultX301).toBe(11);
    expect(resultX302).toBe(12);
    expect(resultX303).toBe(13);
    expect(resultX304).toBe(14);
    expect(resultX305).toBe(12);
    expect(resultX306).toBe(13);
    expect(resultX307).toBe(14);
    expect(resultX308).toBe(15);
    expect(resultX309).toBe(13);
    expect(resultX310).toBe(14);
    expect(resultX311).toBe(15);
    expect(resultX312).toBe(16);
    expect(resultX313).toBe(14);
    expect(resultX314).toBe(15);
    expect(resultX315).toBe(16);
    expect(resultX316).toBe(17);

    // Y Interpolation
    const resultY101 = nCubicInterpolate(3, flatP, coY101);
    const resultY102 = nCubicInterpolate(3, flatP, coY102);
    const resultY103 = nCubicInterpolate(3, flatP, coY103);
    const resultY104 = nCubicInterpolate(3, flatP, coY104);
    const resultY105 = nCubicInterpolate(3, flatP, coY105);
    const resultY106 = nCubicInterpolate(3, flatP, coY106);
    const resultY107 = nCubicInterpolate(3, flatP, coY107);
    const resultY108 = nCubicInterpolate(3, flatP, coY108);
    const resultY109 = nCubicInterpolate(3, flatP, coY109);
    const resultY110 = nCubicInterpolate(3, flatP, coY110);
    const resultY111 = nCubicInterpolate(3, flatP, coY111);
    const resultY112 = nCubicInterpolate(3, flatP, coY112);

    const resultY201 = nCubicInterpolate(3, flatP, coY201);
    const resultY202 = nCubicInterpolate(3, flatP, coY202);
    const resultY203 = nCubicInterpolate(3, flatP, coY203);
    const resultY204 = nCubicInterpolate(3, flatP, coY204);
    const resultY205 = nCubicInterpolate(3, flatP, coY205);
    const resultY206 = nCubicInterpolate(3, flatP, coY206);
    const resultY207 = nCubicInterpolate(3, flatP, coY207);
    const resultY208 = nCubicInterpolate(3, flatP, coY208);
    const resultY209 = nCubicInterpolate(3, flatP, coY209);
    const resultY210 = nCubicInterpolate(3, flatP, coY210);
    const resultY211 = nCubicInterpolate(3, flatP, coY211);
    const resultY212 = nCubicInterpolate(3, flatP, coY212);

    const resultY301 = nCubicInterpolate(3, flatP, coY301);
    const resultY302 = nCubicInterpolate(3, flatP, coY302);
    const resultY303 = nCubicInterpolate(3, flatP, coY303);
    const resultY304 = nCubicInterpolate(3, flatP, coY304);
    const resultY305 = nCubicInterpolate(3, flatP, coY305);
    const resultY306 = nCubicInterpolate(3, flatP, coY306);
    const resultY307 = nCubicInterpolate(3, flatP, coY307);
    const resultY308 = nCubicInterpolate(3, flatP, coY308);
    const resultY309 = nCubicInterpolate(3, flatP, coY309);
    const resultY310 = nCubicInterpolate(3, flatP, coY310);
    const resultY311 = nCubicInterpolate(3, flatP, coY311);
    const resultY312 = nCubicInterpolate(3, flatP, coY312);

    const resultY401 = nCubicInterpolate(3, flatP, coY401);
    const resultY402 = nCubicInterpolate(3, flatP, coY402);
    const resultY403 = nCubicInterpolate(3, flatP, coY403);
    const resultY404 = nCubicInterpolate(3, flatP, coY404);
    const resultY405 = nCubicInterpolate(3, flatP, coY405);
    const resultY406 = nCubicInterpolate(3, flatP, coY406);
    const resultY407 = nCubicInterpolate(3, flatP, coY407);
    const resultY408 = nCubicInterpolate(3, flatP, coY408);
    const resultY409 = nCubicInterpolate(3, flatP, coY409);
    const resultY410 = nCubicInterpolate(3, flatP, coY410);
    const resultY411 = nCubicInterpolate(3, flatP, coY411);
    const resultY412 = nCubicInterpolate(3, flatP, coY412);

    expect(resultY101).toBe(1.5);
    expect(resultY102).toBe(2.5);
    expect(resultY103).toBe(3.5);
    expect(resultY104).toBe(2.5);
    expect(resultY105).toBe(3.5);
    expect(resultY106).toBe(4.5);
    expect(resultY107).toBe(3.5);
    expect(resultY108).toBe(4.5);
    expect(resultY109).toBe(5.5);
    expect(resultY110).toBe(4.5);
    expect(resultY111).toBe(5.5);
    expect(resultY112).toBe(6.5);

    expect(resultY201).toBe(5.5);
    expect(resultY202).toBe(6);
    expect(resultY203).toBe(7.5);
    expect(resultY204).toBe(6.5);
    expect(resultY205).toBe(7.5);
    expect(resultY206).toBe(8.5);
    expect(resultY207).toBe(7.5);
    expect(resultY208).toBe(8.5);
    expect(resultY209).toBe(9.5);
    expect(resultY210).toBe(8.5);
    expect(resultY211).toBe(9.5);
    expect(resultY212).toBe(10.5);

    expect(resultY301).toBe(9.5);
    expect(resultY302).toBe(10.5);
    expect(resultY303).toBe(11);
    expect(resultY304).toBe(10.5);
    expect(resultY305).toBe(11.5);
    expect(resultY306).toBe(12.5);
    expect(resultY307).toBe(11.5);
    expect(resultY308).toBe(12.5);
    expect(resultY309).toBe(13.5);
    expect(resultY310).toBe(12.5);
    expect(resultY311).toBe(13.5);
    expect(resultY312).toBe(14.5);

    expect(resultY401).toBe(13.5);
    expect(resultY402).toBe(14.5);
    expect(resultY403).toBe(15.5);
    expect(resultY404).toBe(14.5);
    expect(resultY405).toBe(15.5);
    expect(resultY406).toBe(16.5);
    expect(resultY407).toBe(15.5);
    expect(resultY408).toBe(16.5);
    expect(resultY409).toBe(17.5);
    expect(resultY410).toBe(16.5);
    expect(resultY411).toBe(17.5);
    expect(resultY412).toBe(18.5);

    // Z Interpolation
    const resultZ101 = nCubicInterpolate(3, flatP, coZ101);
    const resultZ102 = nCubicInterpolate(3, flatP, coZ102);
    const resultZ103 = nCubicInterpolate(3, flatP, coZ103);
    const resultZ104 = nCubicInterpolate(3, flatP, coZ104);
    const resultZ105 = nCubicInterpolate(3, flatP, coZ105);
    const resultZ106 = nCubicInterpolate(3, flatP, coZ106);
    const resultZ107 = nCubicInterpolate(3, flatP, coZ107);
    const resultZ108 = nCubicInterpolate(3, flatP, coZ108);
    const resultZ109 = nCubicInterpolate(3, flatP, coZ109);
    const resultZ110 = nCubicInterpolate(3, flatP, coZ110);
    const resultZ111 = nCubicInterpolate(3, flatP, coZ111);
    const resultZ112 = nCubicInterpolate(3, flatP, coZ112);

    const resultZ201 = nCubicInterpolate(3, flatP, coZ201);
    const resultZ202 = nCubicInterpolate(3, flatP, coZ202);
    const resultZ203 = nCubicInterpolate(3, flatP, coZ203);
    const resultZ204 = nCubicInterpolate(3, flatP, coZ204);
    const resultZ205 = nCubicInterpolate(3, flatP, coZ205);
    const resultZ206 = nCubicInterpolate(3, flatP, coZ206);
    const resultZ207 = nCubicInterpolate(3, flatP, coZ207);
    const resultZ208 = nCubicInterpolate(3, flatP, coZ208);
    const resultZ209 = nCubicInterpolate(3, flatP, coZ209);
    const resultZ210 = nCubicInterpolate(3, flatP, coZ210);
    const resultZ211 = nCubicInterpolate(3, flatP, coZ211);
    const resultZ212 = nCubicInterpolate(3, flatP, coZ212);

    const resultZ301 = nCubicInterpolate(3, flatP, coZ301);
    const resultZ302 = nCubicInterpolate(3, flatP, coZ302);
    const resultZ303 = nCubicInterpolate(3, flatP, coZ303);
    const resultZ304 = nCubicInterpolate(3, flatP, coZ304);
    const resultZ305 = nCubicInterpolate(3, flatP, coZ305);
    const resultZ306 = nCubicInterpolate(3, flatP, coZ306);
    const resultZ307 = nCubicInterpolate(3, flatP, coZ307);
    const resultZ308 = nCubicInterpolate(3, flatP, coZ308);
    const resultZ309 = nCubicInterpolate(3, flatP, coZ309);
    const resultZ310 = nCubicInterpolate(3, flatP, coZ310);
    const resultZ311 = nCubicInterpolate(3, flatP, coZ311);
    const resultZ312 = nCubicInterpolate(3, flatP, coZ312);

    const resultZ401 = nCubicInterpolate(3, flatP, coZ401);
    const resultZ402 = nCubicInterpolate(3, flatP, coZ402);
    const resultZ403 = nCubicInterpolate(3, flatP, coZ403);
    const resultZ404 = nCubicInterpolate(3, flatP, coZ404);
    const resultZ405 = nCubicInterpolate(3, flatP, coZ405);
    const resultZ406 = nCubicInterpolate(3, flatP, coZ406);
    const resultZ407 = nCubicInterpolate(3, flatP, coZ407);
    const resultZ408 = nCubicInterpolate(3, flatP, coZ408);
    const resultZ409 = nCubicInterpolate(3, flatP, coZ409);
    const resultZ410 = nCubicInterpolate(3, flatP, coZ410);
    const resultZ411 = nCubicInterpolate(3, flatP, coZ411);
    const resultZ412 = nCubicInterpolate(3, flatP, coZ412);

    expect(resultZ101).toBe(1);
    expect(resultZ102).toBe(2);
    expect(resultZ103).toBe(3);
    expect(resultZ104).toBe(4);
    expect(resultZ105).toBe(2);
    expect(resultZ106).toBe(3);
    expect(resultZ107).toBe(4);
    expect(resultZ108).toBe(5);
    expect(resultZ109).toBe(3);
    expect(resultZ110).toBe(4);
    expect(resultZ111).toBe(5);
    expect(resultZ112).toBe(6);

    expect(resultZ201).toBe(5.5);
    expect(resultZ202).toBe(6.5);
    expect(resultZ203).toBe(7.5);
    expect(resultZ204).toBe(8.5);
    expect(resultZ205).toBe(6.5);
    expect(resultZ206).toBe(7.5);
    expect(resultZ207).toBe(8.5);
    expect(resultZ208).toBe(9.5);
    expect(resultZ209).toBe(7.5);
    expect(resultZ210).toBe(8.5);
    expect(resultZ211).toBe(9.5);
    expect(resultZ212).toBe(10.5);

    expect(resultZ301).toBe(9.5);
    expect(resultZ302).toBe(10.5);
    expect(resultZ303).toBe(11.5);
    expect(resultZ304).toBe(12.5);
    expect(resultZ305).toBe(10.5);
    expect(resultZ306).toBe(11.5);
    expect(resultZ307).toBe(12.5);
    expect(resultZ308).toBe(13.5);
    expect(resultZ309).toBe(11.5);
    expect(resultZ310).toBe(12.5);
    expect(resultZ311).toBe(13.5);
    expect(resultZ312).toBe(14.5);

    expect(resultZ401).toBe(13.5);
    expect(resultZ402).toBe(14.5);
    expect(resultZ403).toBe(15.5);
    expect(resultZ404).toBe(16.5);
    expect(resultZ405).toBe(14.5);
    expect(resultZ406).toBe(15.5);
    expect(resultZ407).toBe(16.5);
    expect(resultZ408).toBe(17.5);
    expect(resultZ409).toBe(15.5);
    expect(resultZ410).toBe(16.5);
    expect(resultZ411).toBe(17.5);
    expect(resultZ412).toBe(18.5);
  });
});
