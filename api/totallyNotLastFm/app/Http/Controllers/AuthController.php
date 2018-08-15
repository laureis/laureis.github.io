<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;
//use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use App\Http\Controllers\Controller;
class AuthController extends Controller
{
  /**
     * @var \Tymon\JWTAuth\JWTAuth
     */
  protected $jwt;
  protected $email = 'email';
  protected $username = 'username';
  
  public function __construct(JWTAuth $jwt) {
    $this->jwt = $jwt;
    //$this->middleware('auth:Authenticate', ['except' => ['login']]);
  }

  public function login(Request $request) {
    $credentials = $request->only('email', 'password');
    if ($token = $this->guard()->attempt($credentials)) {
      return $this->respondWithToken($token);
    }

    return response()->json(['error' => 'Unauthorized AuthController'], 401);

    /*print_r(['mail' => $request->mail, 'password'=>$request->password] );
        try {
            if (!$token = $this->jwt->qua->attempt(['mail' => $request->mail, 'password'=>$request->password])) {

                return response()->json(['user_not_found'], 404);
            }
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], 500);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], 500);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent' => $e->getMessage()], 500);
        }
        return $this->respondWithToken($token);*/
  }
  /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
  public function logout()
  {
    Auth::logout();
    return response()->json(['message' => 'Successfully logged out'], 200);
  }
  /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
  public function refresh()
  {
    return $this->respondWithToken(Auth::refresh());
  }
  public function me()
  {
    return response()->json(Auth::user(),200);
  }
  /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
  protected function respondWithToken($token)
  {
    return response()->json([
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => Auth::factory()->getTTL() * 60
    ], 200);
  }
  public function guard()
  {
    return Auth::guard();
  }
}