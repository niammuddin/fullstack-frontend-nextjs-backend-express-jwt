import { decode } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';

const TestPage = async () => {

    const session = await getServerSession();
    console.log('test aja: ', session);

    const decoded = await decode({
        token: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..eMUbAk8EOWXAlXdK.nAGMD0syMDczecMFhGDP19DECLpDMwanMxeZLsWJgSDIkV4F0rPc7kDmMrEK9y4EZP7J1PPkQpt4YAU8qvU-IX34G9ksrDNr-2l8hPoWwuNuaeb1FjnBosSEZp1e57fRgQKJLboJbzM2Wr_tqFLRpLepqcZ6Dfmc0VUtsPJMZTBNLqgxm0hU7wbWNnbQCNrfnvWf7DqMJW_1uBhIeSBS1R6jlHBBdL_GlWmhyTdDZtQXRgHMogCgA5zLeYgiVdRz2b74hVflUNnJntfQT8YB597r50PEzYQpdpizr6qZTWpvhr2k54Vgl7-06dHJAe0gZyL8ydDLiTvqxd3oijmUocrA1FHc1gVFsjTtro5H-27wDSr1qiGuy06ObSA96Zvzhh8Ee0pAuKKoY8AVJxdk59HuY_goZHG3scuKFkElyVosGHiXIeXpVd7grIm9oKNCEzuFdsi9sclldcTkGmabMixT7C1Kk-L0IWeWan4815TgouJ5HdAfi7fCML-Eg2jcTZNzNa3098e0RMLXFvl146pAKrdj1pmTdAMUG3MVWg_RFckDFlGwLmoKW3ZIEbEw1i8k9EdUFnDADVAW1ZPdkEjj8j2LbGmiTl_crG8hP1sC_eC_Wafeue-331iPrT5y726T163yLQgiSi6ZT8BvHI6a_N4kn8bRMg3MAlOn.xQhhMjowz-yv5P0IaW8c_g',
        secret: process.env.NEXTAUTH_SECRET,
      });

    //   console.log(decoded);

  return (
        <div>
            {decoded && (
            <pre>{JSON.stringify(decoded, null, 2)}</pre>
            )}
        </div>
        );
};

export default TestPage;
