<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png" />
    <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <title>Snap-EBT PIN</title>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />

    <!-- Bootstrap core CSS     -->
    <link href="{{ asset('/assets/css/bootstrap.min.css') }}" rel="stylesheet" />

    <!--  Material Dashboard CSS    -->
    <link href="{{ asset('/assets/css/material-dashboard.css') }}" rel="stylesheet" />

    {{-- APP STYLES --}}
    <link href="{{ asset('/assets/css/app.style.css') }}" rel="stylesheet" />

    {{-- Sweet alert --}}
    <link href="{{ asset('assets/modules/sweet-alert/sweetalert.css') }}" rel="stylesheet" />


    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet" />

    <!--     Fonts and icons     -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href='//fonts.googleapis.com/css?family=Roboto:400,700,300|Material+Icons' rel='stylesheet' type='text/css'>
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <style>
        /* @media screen and (min-width: 1200px) {
           .milano-checkout-page{
                margin-top:5%;
            }
        }
        @media screen and (min-width: 992px) {
           .milano-checkout-page{
                margin-top:5%;
            }
        }
        @media screen and (min-width: 768px) {
           .milano-checkout-page{
                margin-top:5%;
            }
        } */
    </style>

</head>

<body>

    <div class="container">
        <div class="row milano-checkout-page">
            <div class="col-md-3 col-sm-3"></div>
            <div class="col-md-6 col-sm-6">
                <div class="card">
                    <div class="card-content">
                        <div class="row">
                            <div class="col-sm-12 text-center ">

                                <img style="max-width:200px;" src="https://cdn.shopify.com/s/files/1/0346/7558/9257/files/logomilano400_140x.png" alt="" />

                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-12">
                                <form method="POST" action="{{  }}">
                                    {{ csrf_field() }}

                                    <div class="row">
                                        <div class="col-md-1"></div>
                                        <div class="col-md-10">
                                            <div class="panel panel-default">
                                                <div class="panel-heading">PIN INformation</div>
                                                <div class="panel-body">
                                                    <!-- <input type="hidden" class="form-control" name="AccuId" required value="{{$pin_request['AccuId']}}">
                                                    <input type="hidden" class="form-control" name="AccuReturnURL" required value="{{$pin_request['AccuReturnURL']}}">
                                                    <input type="hidden" class="form-control" name="AccuLanguage" required value="{{$pin_request['AccuLanguage']}}">
                                                    <input type="hidden" class="form-control" name="order_id" required value="{{$pin_request['order_id']}}">
                                                    <input type="hidden" class="form-control" name="xRefnum" required value="{{$pin_request['xRefnum']}}">
                                                    <input type="hidden" class="form-control" name="xToken" required value="{{$pin_request['xToken']}}"> -->
                                                    <div class="row">
                                                        <div class="col-md-1"></div>
                                                        <div class="col-md-10">
                                                            <div class="form-group label-floating">
                                                                <label class="control-label">PIN Number</label>
                                                                <input type="text" class="form-control" name="pin_number" id="pin_number" required>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-1"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-1"></div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-1"></div>
                                        <div class="col-md-10 text-right">
                                            <button class="btn" type="submit" style="background-color: #07b819 ">
                                                Confirm
                                            </button>
                                        </div>
                                        <div class="col-md-1"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-3"></div>
        </div>
    </div>
</body>
<script>
    $(document).ready(function() {
        $('form').submit(function() {
            $(this).find("button[type='submit']").prop('disabled', true);
            $('#cancel_checkout_2').addClass('disabled');
        });
        $('#cancel_checkout_2').click(function() {
            $("button[type='submit']").prop('disabled', true);
            $('#cancel_checkout_2').addClass('disabled');
        });
    });
</script>

</html>